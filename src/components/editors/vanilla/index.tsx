import PlaceholderSidePanel from "./components/PlaceholderSidePanel";
import Editor from "./components/editor";
import SidePanel from "./components/sidepanel";
import { useEffect } from "react";

export default function VanillaEditor() {
  useEffect(() => {
    document.addEventListener("focusout", (e) => {
      const editor = e?.target as HTMLElement;
      if (!editor.classList.contains("vanilla__editor")) return;
      console.log("focusout", editor.innerHTML);
    });

    return () => {
      document.removeEventListener("focusout", () => {});
    };
  });
  return (
    <>
      <Editor />
      <SidePanel component={<PlaceholderSidePanel />} />
    </>
  );
}
