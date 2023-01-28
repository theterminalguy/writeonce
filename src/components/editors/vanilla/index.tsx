import { initialState } from "../../../store/features/editor/editorSlice";
import PlaceholderSidePanel from "./components/PlaceholderSidePanel";
import Editor from "./components/editor";
import SidePanel from "./components/sidepanel";
import Layout from "../../UI/Layout"

export default function VanillaEditor() {
  return (
    <div className="wrapper">
        <Layout>
            <Editor title={initialState.templateName} />
            <SidePanel component={<PlaceholderSidePanel />} />
        </Layout>
    </div>
  );
}
