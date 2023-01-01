import PlaceholderSidePanel from "./components/PlaceholderSidePanel";
import Editor from "./components/editor";
import SidePanel from "./components/sidepanel";

export default function VanillaEditor() {
  return (
    <>
      <Editor />
      <SidePanel component={<PlaceholderSidePanel />} />
    </>
  );
};
