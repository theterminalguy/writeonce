import { initialState } from "../../../store/features/editor/editorSlice";
import PlaceholderSidePanel from "./components/PlaceholderSidePanel";
import Editor from "./components/editor";
import SidePanel from "./components/sidepanel";

export default function VanillaEditor() {
  return (
    <>
      <Editor title={initialState.templateName} />
      <SidePanel component={<PlaceholderSidePanel />} />
    </>
  );
}
