import { initialState, EditorState } from '../../../store/features/editor/editorSlice';
import PlaceholderSidePanel from "./components/PlaceholderSidePanel";
import Editor from "./components/editor";
import SidePanel from "./components/sidepanel";
import Layout from "../../UI/Layout"
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../../store";
import { useEffect } from "react";

export default function VanillaEditor() {
  const { slug } = useParams()
  const navigation = useNavigate();
  const editor = store.getState()?.editorState?.editor.find((editor) => editor.slug === slug) as EditorState;
  useEffect(() => {
    if (!slug) {
      navigation("/")
    }
  }, [])

  return (
    <div className="wrapper">
      <Layout>
        <Editor payload={editor} />
        <SidePanel component={<PlaceholderSidePanel />} />
      </Layout>
    </div>
  );
}
