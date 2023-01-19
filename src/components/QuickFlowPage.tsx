import QuickflowSidePanel from "./editors/vanilla/components/quickflowSidePanel";
import { useEffect } from "react";
import { store } from "../store";

export default function Quickflow() {
  const payload: any = store.getState()?.editorState;
  const editor = payload?.editor

  const replacePlaceholder = (data: any, placeholder: any) => {
    data.style.color = "#993300";
    data.style.fontWeight = "bold";
    data.classList.remove("vanilla__placeholder");
    data.innerText = placeholder.default === "" ? "[ - ]" : placeholder.default;
  }

  useEffect(() => {
    const placeholders = payload?.placeholders;
    for (let placeholder of placeholders) {
      let placholderSelected = `.vanilla__placeholder-${placeholder["id"]}`
      const nodes: any = document.querySelectorAll(placholderSelected)
      const nodeList = Array.from(nodes);
      // TODO: We might need to improve this O^2
      for (let value of nodeList) {
        replacePlaceholder(value, placeholder)
      }
    }
  })
  return (
    <div className="wrapper">
      <div className="quickflow__preview-container">
        <h1 className="quickflow__preview-title">{editor.templateName || "New Template"}</h1>
        <div className="quickflow__preview" dangerouslySetInnerHTML={{ __html: editor.contentHTML }}></div>
        <QuickflowSidePanel />
      </div>
    </div>
  )
}

