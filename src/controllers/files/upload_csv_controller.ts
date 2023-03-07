import { ChangeEvent } from "react";
import { AppLogger } from "./../../lib/logger";
import { Controller } from "@hotwired/stimulus";

const logger = new AppLogger("UploadCsvController");

export default class UploadCSVController extends Controller {
  static targets = ["quickflowWrapper", "quickflowCSVTable"];

  declare readonly quickflowWrapperTarget: HTMLDivElement;
  declare readonly quickflowCSVTableTarget: HTMLTableElement;

  handleCSVImport(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const quickflowWrapper = this.quickflowWrapperTarget;
    const csvTable = this.quickflowCSVTableTarget;

    if (!files) return;
    const csv = files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvString = e.target?.result;
      if (!csvString || typeof csvString !== "string") {
        logger.error(`Error reading ${csvString}`);
        return;
      }
      const patternToMatchNewLine = /[\r\n|\n|\r]/;
      const patternToMatchQuotes = /(^"|"$|^'|'$)/g;
      const patternToMatchCommasSeparatingCells = /(?!\B"[^"]*),(?![^"]*"\B)/;

      const rows = csvString.split(patternToMatchNewLine);

      csvTable.innerHTML = "";
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      for (let i = 0; i < rows.length; i++) {
        const tr = document.createElement("tr");
        if (!rows[i]) continue;

        const row = rows[i].split(patternToMatchCommasSeparatingCells);

        if (i === 0) {
          row.forEach((head) => {
            const th = document.createElement("th");
            const removedQuotes = head.replace(patternToMatchQuotes, "");
            th.textContent = removedQuotes;
            tr.appendChild(th);
          });
          thead.appendChild(tr);
          csvTable.appendChild(thead);
          continue;
        }
        row.forEach((body) => {
          const td = document.createElement("td");
          const removedQuotes = body.replace(patternToMatchQuotes, "");
          td.textContent = removedQuotes;
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
