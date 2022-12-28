import { useEffect } from "react";

import "./index.css";
export default function FloatingToolBarPlugin() {
  const showFloatingToolBar = (e: MouseEvent) => {
    const floatingToolBar = document.querySelector(
      "div.floating-toolbar"
    ) as HTMLElement;
    const selection = window.getSelection();
    if (!selection || selection.type !== "Range") {
      floatingToolBar.style.display = "none";
      return;
    }

    const range = selection.getRangeAt(0);
    const selectionRect = range.getBoundingClientRect();
    const selectedText = selection.toString();
    if (selectedText !== "") {
      floatingToolBar.style.display = "block";
      floatingToolBar.style.left = selectionRect.left + 40 + "px";
      floatingToolBar.style.top = selectionRect.top - 60 + "px";
    } else {
      floatingToolBar.style.display = "none";
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", showFloatingToolBar);
    return () => {
      document.removeEventListener("mouseup", showFloatingToolBar);
    };
  }, []);

  const makeBold = () => document.execCommand("bold");
  const makeItalic = () => document.execCommand("italic");
  const makeUnderline = () => document.execCommand("underline");

  return (
    <div className="floating-toolbar">
      <button
        type="button"
        className="floating-toolbar-button btn-make-placeholder"
        title="Make placeholder"
        onClick={() => {
          console.log("clicked");
        }}
      >{`{x}`}</button>
      <button
        type="button"
        className="floating-toolbar-button btn-make-bold"
        title="Bold"
        onClick={makeBold}
      >
        B
      </button>
      <button
        type="button"
        className="floating-toolbar-button btn-make-italic"
        title="Italic"
        onClick={makeItalic}
      >
        I
      </button>
      <button
        type="button"
        className="floating-toolbar-button btn-make-underline"
        title="Underline"
        onClick={makeUnderline}
      >
        U
      </button>
    </div>
  );
}
