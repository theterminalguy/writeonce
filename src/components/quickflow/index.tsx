import { useEffect } from "react";
import { store } from "../../store";
import "./index.css";
import { PlaceholderState } from "../../store/features/placeholder/placeholderSlice";
import "./index.css";

interface Props {
  uploadCSVConfig: {
    controller: string;
    handleCSVImportAction: string;
    displayQuickflow: string;
    quickflowWrapper: string;
    quickflowCSVTable: string;
  };
}

export default function Quickflow({ uploadCSVConfig }: Props) {
  const payload = store.getState()?.editorState;
  const editor = payload?.editor;

  const replacePlaceholder = (
    data: HTMLSpanElement,
    placeholder: PlaceholderState
  ) => {
    data.style.color = "#993300";
    data.style.fontWeight = "bold";
    data.classList.remove("vanilla__placeholder");
    data.innerText = placeholder.default === "" ? "[ - ]" : placeholder.default;
  };

  useEffect(() => {
    const placeholders = payload?.placeholders;
    for (const placeholder of placeholders) {
      const placholderSelected = `.vanilla__placeholder-${placeholder["id"]}`;
      const nodes: NodeListOf<HTMLSpanElement> =
        document.querySelectorAll(placholderSelected);
      const nodeList = Array.from(nodes);
      // TODO: We might need to improve this O^2
      for (const value of nodeList) {
        replacePlaceholder(value, placeholder);
      }
    }
  });

  useEffect(() => {
    const placeholders = payload?.placeholders;
    for (const placeholder of placeholders) {
      const placholderSelected = `.vanilla__placeholder-${placeholder["id"]}`;
      const nodes: NodeListOf<HTMLBodyElement> =
        document.querySelectorAll(placholderSelected);
      const nodeList = Array.from(nodes);
      // TODO: We might need to improve this O^2
      for (const value of nodeList) {
        replacePlaceholder(value, placeholder);
      }
    }
  });
  return (
    <div>
      <div
        data-files--upload-csv-target={uploadCSVConfig.quickflowWrapper}
        className="quickflow__wrapper vanilla__editor-container"
      >
        <h1 className="vanilla__quickflow__preview-title vanilla__editor-title">
          {editor.templateName || "New Template"}
        </h1>
        <div
          className="vanilla__quickflow__preview"
          dangerouslySetInnerHTML={{ __html: editor.contentHTML }}
        ></div>
      </div>
      <div className="quickflow__csv-table-wrapper">
        <table
          data-files--upload-csv-target={uploadCSVConfig.quickflowCSVTable}
          className="quickflow__csv-table"
        ></table>
      </div>
    </div>
  );
}
