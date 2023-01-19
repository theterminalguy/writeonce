import { initialState } from "../../../store/features/editor/editorSlice";
import PlaceholderSidePanel from "./components/PlaceholderSidePanel";
import Editor from "./components/editor";
import SidePanel from "./components/sidepanel";
import Layout from "../../UI/Layout"
import Menu from "../../menu"

export default function VanillaEditor() {
  return (
    <div className="wrapper">
        <Layout>
            <div> <Menu /> </div>
            <div> <Editor title={initialState.templateName} /> </div>
            <div> <SidePanel component={<PlaceholderSidePanel />} /> </div>
        </Layout>
    </div>
  );
}
