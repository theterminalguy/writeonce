import { useEffect } from "react";

import "./index.css";
import FloatingToolBarPlugin from "../../plugins/FloatingToolBarPlugin";
import {
  setContent,
  setTemplateName,
} from "../../../../../store/features/editor/editorSlice";
import { store } from "../../../../../store";

// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

export default function Editor({ title }: { title: string }) {
  useEffect(() => {
    // focus the editor on load
    const editor = document.querySelector("div.vanilla__editor") as HTMLElement;
    editor.focus();
    editor.addEventListener("focusout", function (e) {
      const input = e?.target as HTMLElement;
      // TODO only dispatch if the content has changed
      store.dispatch(
        setContent({
          contentText: input.innerText,
          contentHTML: input.innerHTML,
        })
      );
    });
    const title = document.querySelector("h1.vanilla__editor-title") as HTMLElement;
    title.addEventListener("focusout", function (e) {
      const input = e?.target as HTMLElement;
      // TODO only dispatch if the content has changed
      store.dispatch(setTemplateName(input.innerText));
    });

    return () => {
      editor.removeEventListener("focusout", () => {});
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
        placeholder="Let the words flow..."
      ></div>
      <FloatingToolBarPlugin />
    </div>
  );
}
