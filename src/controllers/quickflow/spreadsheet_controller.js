import { Controller } from "@hotwired/stimulus";
import { store } from "../../store";
import { setTabStatus } from "../../store/features/editor/editorSlice";
import { updatePlaceholder } from "../../store/features/placeholder/placeholderSlice";

export default class SpreasheetController extends Controller {
  static targets = ["tableBody", "field"];

  initialize() {
    this.rowCount = 2;
    this.previewStatusId = 2;
    this.placeholders = store.getState().editorState.placeholders || [];
    //console.log(this.fieldTarget)
    //const fields = this.fieldTarget;//document.querySelectorAll(".quickflow__table-field");
    // const fieldsArray =  this.fieldTarget; //Array.from(fields);
    // let isEmpty = false;
    // let values = [];
    // this.fieldTargets.forEach((field) => {
    //   field.addEventListener("change", (event) => {
    //     if (event.target.value !== "") {
    //       isEmpty = true;
    //     }
    //   });
    // });

    // for (const [index, field] of Object.entries(fieldsArray)) {
    //   const target = field;
    //   const elem = target;
    //   elem.addEventListener("focusout", (event) => {
    //     if (event.value !== "") {
    //       isEmpty = true;
    //     }
    //   });
    // }
    // if (isEmpty) {
    //   this.onAddNewRow();
    //   console.log("field is not empty");
    // }
    // console.log(isEmpty)
  }

  // get fieldTargets() {
  //   return this.targets.findAll("field");
  // }

  onDelete(event) {
    if (window.confirm("Are you sure ?")) {
      const table = this.tableBodyTarget;
      const node = event.target.parentNode;
      const elem = node.parentNode;
      table.removeChild(elem);
      this.rowCount--;
      const rows = table.getElementsByTagName("tr");
      for (let i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName("td")[0].innerHTML = i + 1;
      }
    }
  }

  onAddNewRow(event) {
    const input = event.target;
    const node = input.parentNode;
    const data = node.parentNode;
    console.log("we see you here");
    const elem = document.querySelector(".quickflow__table-body"); //data.parentNode;
    const fragment = document.createDocumentFragment();
    const row = document.createElement("tr");
    const tdRow = document.createElement("td");
    tdRow.innerText = this.rowCount;
    row.appendChild(tdRow);
    row.classList.add("quickflow__table-row");
    row.classList.add("quickflow__table-row-" + this.rowCount);

    const tableRow = fragment.appendChild(row);
    const fields = this.placeholders.length;
    for (let i = 0; i < fields; i++) {
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.classList.add("quickflow__table-field");
      input.classList.add("quickflow__table-field-" + this.rowCount);
      input.setAttribute(
        "data-action",
        "focusout->quickflow--spreadsheet#onAddNewRow"
      );

      const btn = document.createElement("button");
      btn.setAttribute("data-action", "click->quickflow--spreadsheet#onDelete");
      const td = document.createElement("td");
      tableRow.appendChild(td).appendChild(input);
    }

    const tdElem = document.createElement("td");
    // const btnAdd = document.createElement("button");
    // btnAdd.innerText = "Add";
    // btnAdd.setAttribute(
    //   "data-action",
    //   "click->quickflow--spreadsheet#onAddNewRow"
    // );
    // tdElem.appendChild(btnAdd);
    const btnElem = document.createElement("button");
    const btnPreview = document.createElement("button");
    btnPreview.innerText = "preview";
    btnPreview.setAttribute(
      "data-action",
      "click->quickflow--spreadsheet#onPreview"
    );
    tdElem.appendChild(btnPreview);

    btnElem.setAttribute(
      "data-action",
      "click->quickflow--spreadsheet#onDelete"
    );
    btnElem.innerText = "delete";
    tdElem.appendChild(btnElem);
    row.appendChild(tdElem);

    elem.appendChild(tableRow);
    this.rowCount++;
  }

  onPreview(event) {
    const target = event.target;
    const node = target.parentNode;
    const data = node.parentNode;
    const inputs = data.querySelectorAll("input");
    const inputsArray = Array.from(inputs);

    for (const [index, input] of Object.entries(inputsArray)) {
      const target = input;
      const elem = target;
      const placeholder = this.placeholders[index];

      // store.dispatch(setTabStatus(1))
      store.dispatch(
        updatePlaceholder({ id: placeholder.id, default: elem.value })
      );
      // document.querySelector(".content-tab").style.display = "block";
      // document.querySelector(".data-tab").style.display = "none";
    }
  }
}
