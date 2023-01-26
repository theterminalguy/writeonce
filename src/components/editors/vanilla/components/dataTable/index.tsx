import { useEffect } from "react";
import "./index.css"

export default function Table({ columns }: any) {
  const fields = Object.keys(columns);

  const handleDeleteRow = (e: any) => {
    if(window.confirm("Are you sure ?")) {
      const table: any = document.querySelector(".quickflow__table-body");
      const elem = e.target.parentNode.parentNode;
      table.removeChild(elem)
    }
  }

  const handleDataPreview = (e: any) => {
    const parentElem = e.target.parentNode.parentNode;
    parentElem.classList.add("quickflow__table-selected")
  }
  
  let index = 1

  const handleNewField = (e: any) => {
    if (e.target.value === "") {
      e.target.focus();
      return false;
    }

    const idx = e.target.parentNode.parentNode.getAttribute("data-index");
    const nextIndex = parseInt(idx) + 1 || 1;
    const fieldInputField: any = document.querySelector(`.quickflow__table-row-${nextIndex} .quickflow__table-field`);
    if(fieldInputField && fieldInputField.value === "") {
      fieldInputField.focus();
      return false;
    }


    const elem = e.target.parentNode.parentNode.parentNode;
    const fragment = document.createDocumentFragment();
    const row = document.createElement("tr");
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
      input.addEventListener('dblclick', handleDataPreview)

      const btn = document.createElement("button");
      btn.addEventListener('click', handleDeleteRow)

      const row = document.createElement("th")
      // row.appendChild(btn)
      tableRow
        .appendChild(row)
        .appendChild(input)
    }
    elem.appendChild(tableRow)
    index = index + 1
  }

  return (
    <table border={0} width={"100%"} bgcolor={"#ccc"} cellPadding={"5"} cellSpacing={"1"}>
      <thead>
        <tr>
          {/* <th>Option </th>bh */}
          {fields.map((field) => {
            return (
              <th>{field}</th>
            )
          })}
        </tr>
      </thead>
      <tbody className="quickflow__table-body">
        <tr className="quickflow__table-row" data-index={index}>
          {/* <th><button onClick={handleDeleteRow}>delete x</button></th> */}
          {fields.map((_, index) => {
            return (
              <th key={index}> <input type="text" className="quickflow__table-field" onClick={(e) => handleNewField(e)} /></th>
            )
          })}
        </tr>
      </tbody>
    </table>
  );
}