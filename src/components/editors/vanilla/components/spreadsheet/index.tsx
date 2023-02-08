import { store } from "../../../../../store";
import { PlaceholderState, updatePlaceholder } from "../../../../../store/features/placeholder/placeholderSlice";
import "./index.css"
import { useEffect, useState } from "react";

interface Props {
  placeholders: PlaceholderState[];
  changeTabPanel: (data: number) => void;
}

export default function Spreadsheet({ placeholders, changeTabPanel }: Props) {
  const columns: { [key: string]: string } = {}
  for (const placeholder of placeholders) {
    columns[placeholder.name] = placeholder.default;
  }
  const fields = Object.keys(columns);
  const config = {
    "controller": "quickflow--spreadsheet",
  }

  return (
    <table border={0} data-controller={config.controller} width={"100%"} bgcolor={"#ccc"} cellPadding={"5"} cellSpacing={"1"} preview-tab-id={2}>
      <thead>
        <tr>
          <th>&nbsp; </th>
          {fields.map((field, index) => {
            return (
              <th key={index}>{field}{placeholders[index].required ? <span className="quickflow__sidebar-required">*</span> : null}
                {placeholders[index].description ? <p style={{ fontWeight: "normal", padding: "0px", margin: "0px" }}>{placeholders[index].description}</p> : null}
              </th>
            )
          })}
          <th>Option </th>
        </tr>
      </thead>
      <tbody className="quickflow__table-body" data-target={`${config.controller}.tableBody`}>
        <tr className="quickflow__table-row">
          <td>1</td>
          {fields.map((_, index) => {
            return (
              <td key={index}> <input type="text" data-action={`focusout->${config.controller}#onAddNewRow`} defaultValue={placeholders[index].default} className="quickflow__table-field" /></td>
            )
          })}
          <td>
            <button data-action={`click->${config.controller}#onPreview`}>preview</button>
            <button data-action={`click->${config.controller}#onDelete`}>delete</button></td>
        </tr>
      </tbody>
    </table>
  );
}
