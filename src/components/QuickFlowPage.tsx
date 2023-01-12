import { EditorState } from "../store/features/editor/editorSlice";
import QuickflowSidePanel from "./editors/vanilla/components/quickflowSidePanel";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Quickflow() {
  const payload: any = useSelector((state: any) => state.editorState);
  const editor = payload?.editor
  useEffect(() => {
    const placeholders = payload?.placeholders;
    for (let placeholder of placeholders) {
      let placholderSelected = `.vanilla__placeholder-${placeholder["id"]}`
      const data: any = document.querySelector(placholderSelected)
      data.style.color = "#993300";
      data.style.fontWeight = "bold";
      data.classList.remove("vanilla__placeholder");
      data.innerText = placeholder.default === "" ? "[ - ]" : placeholder.default;
    }
  })
  return (
    <div className="wrapper">
      <div className="vanilla__editor-container">
        <h1 className="vanilla__editor-title">{editor.templateName || "New Template"}</h1>
        <div className="vanilla__editor" dangerouslySetInnerHTML={{ __html: editor.contentHTML }}></div>
        <QuickflowSidePanel />
      </div>
    </div>
  )
}
