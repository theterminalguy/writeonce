import { store } from "../../../../../store";
import { PlaceholderState, updatePlaceholder } from "../../../../../store/features/placeholder/placeholderSlice";
import "./index.css"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

interface Props {
  placeholders: PlaceholderState[];
  changeTabPanel: (data: number) => void;
}

interface ColumnType {
  [key: string]: string | boolean;
}

export default function Spreadsheet({ placeholders, changeTabPanel }: Props) {
  const columns: ColumnType = { isValid: false }
  const [inputs, setInputs] = useState<ColumnType[]>([]);
  const placeholderIds: Array<string> = [];

  for (const placeholder of placeholders) {
    columns[placeholder.name] = ""; //placeholder.default;
    placeholderIds.push(placeholder.id);
  }

  const fields = Object.keys(columns);
  const handleDeleteRow = (e: MouseEvent<HTMLButtonElement> | Event) => {
    if (window.confirm("Are you sure ?")) {
      const table: Element | null = document.querySelector(".quickflow__table-body");

      const target = e.target as HTMLElement;
      const node = target.parentNode as ParentNode;
      const elem = node.parentNode as HTMLElement;
      table?.removeChild(elem)
    }
  }

  const handleDataPreview = (e: MouseEvent<HTMLButtonElement> | Event) => {
    changeTabPanel(1);
    const target = e.target as HTMLElement;
    const node = target.parentNode as ParentNode;
    const data = node.parentNode as HTMLElement;
    const inputs: NodeListOf<HTMLElement> = data.querySelectorAll("input");
    const inputsArray = Array.from(inputs);

    for (const [index, input] of Object.entries(inputsArray)) {
      const elem = input as HTMLInputElement;
      const placeholderId = placeholderIds[Number(index)];

      store.dispatch(
        updatePlaceholder({ id: placeholderId, default: elem.value })
      );
    }
  }

  useEffect(() => {
    if (fields.length > 0) {
      setInputs([columns]);
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement> | Event, index: number, column: string) => {
    const newInputs: ColumnType[] = [...inputs];
    const input = event.target as HTMLElement;
    const target = input as HTMLInputElement;
    newInputs[index][column] = target.value;
    newInputs[index].isValid = target.value.length > 0;
    setInputs(newInputs);

    if (newInputs.every((input: ColumnType) => input.isValid)) {
      setInputs([...newInputs, columns]);
    }
  };

  const handleBlur = (index: number, field: string) => {
    if (inputs[index][field] === "") {
      const newInputs = [...inputs];
      newInputs[index]["isValid"] = false;
      setInputs(newInputs);
    }
  };

  return (
    <div>
      <table border={0} width={"100%"} bgcolor={"#ccc"} cellPadding={"5"} cellSpacing={"1"}>
        <thead>
          <tr>
            <th>&nbsp;</th>
            {fields.map((field) => {
              if (field === "isValid") {
                return null;
              }
              return (
                <th>{field}</th>
              )
            })}
            <th>Option </th>
          </tr>
        </thead>
        <tbody className="quickflow__table-body">
          {inputs.map((input, index) => (
            <tr key={index} className="quickflow__table-row">
              <td>{index + 1}</td>
              {fields.map((field, idx) => {
                if (field === "isValid") {
                  return null;
                }
                return (
                  <td key={`${index}-${idx}`}>
                    <input
                      type="text"
                      value={input[field] as string}
                      onChange={(event) => { handleChange(event, index, field) }}
                      onBlur={() => handleBlur(index, field)}
                      className="quickflow__table-field"
                    />
                  </td>
                )
              })}
              <td>
                <button onClick={handleDataPreview}>preview</button>
                <button onClick={handleDeleteRow}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
