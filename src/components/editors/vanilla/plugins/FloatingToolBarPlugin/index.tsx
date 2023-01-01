import { useEffect, useState } from "react";
import { generate } from "shortid";

import "./index.css";
import Modal, { $getModal } from "../../components/modal";
import Placeholder, { $getPlaceholder } from "../../components/placeholder";
export default function FloatingToolBarPlugin() {
  const [rendered, setRendered] = useState(false);

  const uniqueId = generate();
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

  // TODO: make this function a hook and move it to a separate file
  const makePlaceholder = () => {
    console.log('uniqueId makePlaceholder', uniqueId)
    // if the modal is visible, don't do anything
    if (isModalVisible(uniqueId)) {
      // tell the user to complete the previous action
      alert("Please complete the previous action");
      // set focus on the input
      const input = document.querySelector(
        `div.vanilla__modal-${uniqueId} input[type="text"]`
      ) as HTMLInputElement;
      input.focus();
      return;
    }
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
    const selectedText = selection.toString();
    replaceSelectionWithPlaceholderNode(selection, selectedText, uniqueId);
    showRenamePlaceholderModal(selection, selectedText, uniqueId);
  };

  const handleModalOk = () => {
    const modal = $getModal(uniqueId);
    if (!modal) {
      console.error("Modal not found");
      return;
    }
    const input = modal.querySelector(`input[type="text"]`) as HTMLInputElement;
    // validate placeholder name
    if (input.value.trim() === "") {
      // show error
      modal.classList.add("vanilla__modal-error");
      return;
    }
    // re-render component
    setRendered(!rendered);
  };

  const handleModalCancel = () => {
    const modal = $getModal(uniqueId);
    if (!modal) {
      // TODO: show error to the user
      console.error("Modal not found");
      return;
    }
    modal.style.display = "none";
    if (modal.classList.contains("vanilla__modal-error")) {
      modal.classList.remove("vanilla__modal-error");
    }
    const input = modal.querySelector(`input[type="text"]`) as HTMLInputElement;
    input.value = "";

    // undo the placeholder creation
    const placeholder = $getPlaceholder(uniqueId);
    if (!placeholder) {
      // TODO: show error to the user
      console.error("Placeholder not found");
      return;
    }
    const originalText = placeholder.getAttribute("data-placeholder-original-text");
    if (!originalText) {
      // TODO: show error to the user
      console.error("Original text not found");
      return;
    }
    const textNode = document.createTextNode(originalText);
    placeholder.parentNode?.replaceChild(textNode, placeholder);
    // re-render component
    setRendered(!rendered);
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
      <Modal
        id={uniqueId}
        title="Enter a name"
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
      />
    </>
  );
}

function isModalVisible(modalId: string) {
  const modal = document.querySelector(
    `div.vanilla__modal-${modalId}`
  ) as HTMLElement;
  return modal.style.display === "block";
}

function showRenamePlaceholderModal(
  selection: Selection,
  selectedText: string,
  moadalId: string
) {
  const { left, top } = $getSelectionRect(selection);
  const modal = document.querySelector(
    `div.vanilla__modal-${moadalId}`
  ) as HTMLElement;
  modal.style.display = "block";
  modal.style.left = left - 32 + "px";
  modal.style.top = top + 30 + "px";

  // set focus on the input
  const input = modal.querySelector('input[type="text"]') as HTMLInputElement;
  input.value = selectedText;
  input.focus();
}

const replaceSelectionWithPlaceholderNode = (
  selection: Selection,
  selectedText: string,
  placholderId: string
) => {
  const placeholderComponent = new Placeholder({
    id: placholderId,
    name: selectedText,
    originalText: selectedText,
  });
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(placeholderComponent.render());
};

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
