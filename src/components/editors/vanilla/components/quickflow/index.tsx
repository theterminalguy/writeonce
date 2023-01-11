import { EditorState } from "../../../../../store/features/editor/editorSlice";
import QuickflowSidePanel from "../quickflowSidePanel";
import { useSelector } from "react-redux";

export default function Quickflow() {
  const editor: EditorState = useSelector((state: any) => state.editorState.editor);
  return (
    <div className="wrapper">
      <div className="vanilla__editor-container">
        <h1 className="vanilla__editor-title">{editor.templateName || "New Template"}</h1>
        <div className="vanilla__editor"  dangerouslySetInnerHTML={{ __html: editor.contentHTML}}></div>
        <QuickflowSidePanel />
      </div>
    </div>
  )
}
