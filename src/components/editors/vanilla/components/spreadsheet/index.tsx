import { store } from "../../../../../store";
import { PlaceholderState, updatePlaceholder } from "../../../../../store/features/placeholder/placeholderSlice";
import "./index.css"
import { MouseEvent } from "react";

interface Props {
  placeholders: PlaceholderState[];
  changeTabPanel: (data: number) => void;
}

export default function Spreadsheet({ placeholders, changeTabPanel }: Props) {
  const columns: { [key: string]: string } = {}
  const placeholderIds: Array<string> = [];

  for (const placeholder of placeholders) {
    columns[placeholder.name] = placeholder.default;
    placeholderIds.push(placeholder.id);
  }
  const fields = Object.keys(columns);
  const tRLength: NodeListOf<HTMLElement> = document.querySelectorAll(".quickflow__table-row");
  let index = Array.from(tRLength).length || 1;

  const handleDeleteRow = (e: MouseEvent<HTMLButtonElement> | Event) => {
    if (window.confirm("Are you sure ?")) {
      const table: Element | null = document.querySelector(".quickflow__table-body");
      index = index - 1 || 1;
      
      const target = e.target as HTMLElement;
      const node = target.parentNode as ParentNode;
      const elem = node.parentNode as HTMLElement;
      table?.removeChild(elem)
    }
  }

  const handleDataPreview = (e: MouseEvent<HTMLButtonElement> | Event) => {
    // change tab to preview(content)
    changeTabPanel(1);
    const target = e.target as HTMLElement;
    const node = target.parentNode as ParentNode;
    const data = node.parentNode as HTMLElement;
    const inputs: NodeListOf<HTMLElement> = data.querySelectorAll("input");
    const inputsArray = Array.from(inputs);

    for (const [index, input] of Object.entries(inputsArray)) {
      const target = input as HTMLElement;
      const elem = target as HTMLInputElement;  
      const placeholderId = placeholderIds[Number(index)];

      store.dispatch(
        updatePlaceholder({ id: placeholderId, default: elem.value })
      );
    }
  }

  const handleNewField = (e: MouseEvent<HTMLInputElement> | Event) => {
    const target = e.target as HTMLElement;
    const input = target as HTMLInputElement;  
    if (input.value === "") {
      target.focus();
      return false;
    }
    const node = target.parentNode as ParentNode;
    const data = node.parentNode as HTMLElement;
    const idx = data.getAttribute("data-index") as string;
    const nextIndex = parseInt(idx) + 1 || 1;

    const fieldInputField: HTMLInputElement | null = document.querySelector(`.quickflow__table-row-${nextIndex} .quickflow__table-field`);
    if (fieldInputField && fieldInputField.value === "") {
      fieldInputField.focus();
      return false;
    }
    
    const elem = data.parentNode as ParentNode;
    const fragment = document.createDocumentFragment();
    const row = document.createElement("tr");
    const tdRow = document.createElement("td");
    tdRow.innerText = String(index + 1)
    row.appendChild(tdRow)
    row.classList.add("quickflow__table-row")
    row.classList.add(`quickflow__table-row-${index}`)
    row.setAttribute("data-index", String(index))

    const tableRow = fragment
      .appendChild(row);

    for (const _ in fields) {
      const input = document.createElement("input");
      input.setAttribute("type", "text")
      input.classList.add("quickflow__table-field");
      input.addEventListener('click', handleNewField)

      const btn = document.createElement("button");
      btn.addEventListener('click', handleDeleteRow)

      const td = document.createElement("td")

      tableRow
        .appendChild(td)
        .appendChild(input)
    }

    const tdElem = document.createElement("td");
    const btnElem = document.createElement("button");
    const btnPreview = document.createElement("button");
    btnPreview.innerText = "preview";
    btnPreview.addEventListener('click', handleDataPreview);
    tdElem.appendChild(btnPreview);

    btnElem.addEventListener('click', handleDeleteRow);
    btnElem.innerText = "delete"
    tdElem.appendChild(btnElem);
    row.appendChild(tdElem)

    elem.appendChild(tableRow)
    index = index + 1
  }

  return (
    <table border={0} width={"100%"} bgcolor={"#ccc"} cellPadding={"5"} cellSpacing={"1"}>
      <thead>
        <tr>
          <th>&nbsp; </th>
          {fields.map((field) => {
            return (
              <th>{field}</th>
            )
          })}
          <th>Option </th>
        </tr>
      </thead>
      <tbody className="quickflow__table-body">
        <tr className="quickflow__table-row" data-index={index}>
          <td>1</td>
          {fields.map((_, index) => {
            return (
              <td key={index}> <input type="text" className="quickflow__table-field" onClick={handleNewField} /></td>
            )
          })}
          <td><button onClick={handleDataPreview}>preview</button>
            <button onClick={handleDeleteRow}>delete</button></td>
        </tr>
      </tbody>
    </table>
  );
}