import { useEffect } from "react";

import "./index.css";
import FloatingToolBarPlugin from "../../plugins/FloatingToolBarPlugin";
import {
  setHtmlText,
  setPlainText,
  setTemplateName,
} from "../../../../../store/features/editor/editorSlice";
import { store } from "../../../../../store";

// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

export default function Editor({ title }: { title: string }) {
  useEffect(() => {
    document.addEventListener("focusout", (e) => {
      const input = e?.target as HTMLElement;
      if (
        !input.classList.contains("vanilla__editor") &&
        !input.classList.contains("vanilla__editor-title")
      ) {
        return;
      }
      const isInputEditor = input.classList.contains("vanilla__editor");
      const isInputTitle = input.classList.contains("vanilla__editor-title");

      if (isInputEditor) {
        store.dispatch(setPlainText(input.innerText));
        store.dispatch(setHtmlText(input.innerHTML));
      }
      if (isInputTitle) {
        store.dispatch(setTemplateName(input.innerText));
      }
    });

    return () => {
      document.removeEventListener("focusout", () => {});
    };
  });

  return (
    <div className="vanilla__editor-container">
      <h1
        contentEditable="true"
        suppressContentEditableWarning={true}
        className="vanilla__editor-title"
      >
        {title}
      </h1>
      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="vanilla__editor"
      ></div>
      <FloatingToolBarPlugin />
    </div>
  );
}
