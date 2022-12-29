import { useEffect } from "react";
import { generate } from 'shortid';

import "./index.css";
import Modal from "../../components/modal";
import Placeholder from "../../components/placeholder";
export default function FloatingToolBarPlugin() {
  const showFloatingToolBar = (e: MouseEvent) => {
    const floatingToolBar = document.querySelector(
      "div.vanilla__floating-toolbar"
    ) as HTMLElement;
    const selection = window.getSelection();
    if (!selection || !$isRangeSelection(selection)) {
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
  const makePlaceholder = () => {
    const selection = window.getSelection();
    if (!selection || !$isRangeSelection(selection)) {
      return;
    }
    if ($isSelectionPlaceholder(selection)) {
      // TODO: show a message to the user
      // use custom alert
      alert("You can't nest placeholders");
      return;
    }
    const { left, top } = $getSelectionRect(selection);
    console.log(left, top);

    const selectedText = selection.toString();
    const placeholderId = generate();
    const placeholderComponent = new Placeholder({
      id: placeholderId,
      name: selectedText,
      originalText: selectedText,
    });
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(placeholderComponent.render());
  };

  return (
    <>
      <div className="vanilla__floating-toolbar">
        <button
          type="button"
          className="vanilla__floating-toolbar-button vanilla__btn-make-placeholder"
          title="Make placeholder"
          onClick={makePlaceholder}
        >{`{x}`}</button>
        <button
          type="button"
          className="vanilla__floating-toolbar-button vanilla__btn-make-bold"
          title="Bold"
          onClick={makeBold}
        >
          B
        </button>
        <button
          type="button"
          className="vanilla__floating-toolbar-button vanilla__btn-make-italic"
          title="Italic"
          onClick={makeItalic}
        >
          I
        </button>
        <button
          type="button"
          className="vanilla__floating-toolbar-button vanilla__btn-make-underline"
          title="Underline"
          onClick={makeUnderline}
        >
          U
        </button>
      </div>
      <Modal title="Enter a name" handleOk={() => {}} handleCancel={() => {}} />
    </>
  );
}

const $isSelectionPlaceholder = (selection: Selection) => {
  const parentNode = selection?.anchorNode?.parentNode as HTMLElement;
  return parentNode && parentNode.classList.contains("vanilla__placeholder");
};

const $isRangeSelection = (selection: Selection) => {
  return selection.type === "Range";
};

const $getSelectionRect = (selection: Selection) => {
  const range = selection.getRangeAt(0);
  return range.getBoundingClientRect();
};
