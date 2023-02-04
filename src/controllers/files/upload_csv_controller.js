import { Controller } from "@hotwired/stimulus";

export default class UploadCSVController extends Controller {
  static targets = ["quickflowWrapper", "quickflowCSVTable"];

  handleCSVImport(e) {
    const files = e.target.files;
    const quickflowWrapper = this.quickflowWrapperTarget;
    const csvTable = this.quickflowCSVTableTarget;

    if (!files) return;
    const csv = files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvString = e.target?.result;
      if (!csvString) return;
      const patternToMatchNewLine = /[\r\n|\n|\r]/;
      const rows = csvString.split(patternToMatchNewLine);

      csvTable.innerHTML = "";
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      for (let i = 0; i < rows.length; i++) {
        const tr = document.createElement("tr");
        if (!rows[i]) continue;
        const patternToMatchCommasSeparatingCells = /(?!\B"[^"]*),(?![^"]*"\B)/;
        const row = rows[i].split(patternToMatchCommasSeparatingCells);

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

    reader.readAsText(csv);
  }

  displayQuickflow() {
    this.quickflowWrapperTarget.setAttribute("style", "display:flex");
    this.quickflowCSVTableTarget.setAttribute("style", "display:none");
  }
}

export const uploadCSVConfig = {
  controller: "files--upload-csv",
  handleCSVImportAction: "handleCSVImport",
  displayQuickflow: "displayQuickflow",
};
