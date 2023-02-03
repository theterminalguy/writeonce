import { Controller } from "@hotwired/stimulus";
import { ChangeEvent } from "react";

export default class UploadCSVController extends Controller {
  static targets = ["quickflow"];

  handleCSVImport(e: ChangeEvent) {
    const files = (e.target as HTMLInputElement).files;
    const quickflowWrapper = document.querySelector(
      ".quickflow__wrapper.vanilla__editor-container"
    ) as HTMLDivElement;
    const csvTable = document.querySelector(
      ".quickflow__csv-table"
    ) as HTMLDivElement;

    if (!files) return;
    const csv = files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvString = e.target?.result;
      if (!csvString) return;
      const rows = (csvString as string).split(/[\r\n|\n|\r]/);

      csvTable.innerHTML = "";
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      for (let i = 0; i < rows.length; i++) {
        const tr = document.createElement("tr");
        if (!rows[i]) continue;

        const row = rows[i].split(/(?!\B"[^"]*),(?![^"]*"\B)/);

        if (i === 0) {
          row.forEach((head) => {
            const th = document.createElement("th");
            th.textContent = head;
            tr.appendChild(th);
          });
          thead.appendChild(tr);
          csvTable.appendChild(thead);
          continue;
        }
        row.forEach((body) => {
          const td = document.createElement("td");
          td.textContent = body;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      }
      csvTable.appendChild(tbody);

      quickflowWrapper?.setAttribute("style", "display:none");
      csvTable?.setAttribute("style", "display:block");
    };
    //

    reader.readAsText(csv);
  }

  displayQuickflow() {
    const quickflowWrapper = document.querySelector(
      ".quickflow__wrapper.vanilla__editor-container"
    ) as HTMLDivElement;
    const csvTable = document.querySelector(
      ".quickflow__csv-table"
    ) as HTMLDivElement;
    quickflowWrapper.setAttribute("style", "display:flex");
    csvTable.setAttribute("style", "display:none");
  }
}

export const uploadCSVConfig = {
  controller: "files--upload-csv",
  handleCSVImportAction: "handleCSVImport",
  displayQuickflow: "displayQuickflow",
};
