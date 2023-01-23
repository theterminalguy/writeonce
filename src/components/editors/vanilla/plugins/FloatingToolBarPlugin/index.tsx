import { useEffect, useState } from "react";
import { generate } from "shortid";
import ReactDOMServer from "react-dom/server";

import "./index.css";
import Modal, { $closeModal, $getModal } from "../../components/modal";
import Placeholder, {
  $getPlaceholder,
  $getPlaceholderOriginalText,
  $placeholdify,
  $undoPlaceholdify,
  $isPlaceholderNameUnique,
  $mergePlaceholders,
} from "../../components/placeholder";
import PlaceholderItem from "../../components/PlaceholderSidePanel/PlaceholderItem";
import { store } from "../../../../../store";
import {
  addPlaceholder,
  deletePlaceholder,
} from "../../../../../store/features/placeholder/placeholderSlice";
import { Events } from "../../../../events";

export default function FloatingToolBarPlugin() {
  const [rendered, setRendered] = useState(false);

  const uniqueId = generate();
  const showFloatingToolBar = (e: MouseEvent) => {
    e.stopPropagation();
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
      console.log("select: ", selectionRect);
      floatingToolBar.style.left = selectionRect.left - 200 + "px";
      floatingToolBar.style.top = selectionRect.top + 20 +"px";
    } else {
      floatingToolBar.style.display = "none";
    }
  };

  const handlePlaceholderAdd = (e: Event) => {
    e.stopPropagation();
    const customEvent = e as CustomEvent;
    const detail = customEvent.detail as {
      id: string;
      name: string;
    };
    const sidePanel = document.querySelector(
      "div.vanilla__placeholder-side-panel"
    ) as HTMLElement;
    const deleteButton = sidePanel.querySelector(
      `button.vanilla__placeholder-item-delete-${detail.id}`
    ) as HTMLButtonElement;
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      onPlaceholderSidepanelDelete(detail.id);
    });
  };

  useEffect(() => {
    const editor = document.querySelector("div.vanilla__editor") as HTMLElement;
    editor.addEventListener("mouseup", showFloatingToolBar);
    document.addEventListener(Events.PlaceholderAdded, handlePlaceholderAdd);
    return () => {
      editor.removeEventListener("mouseup", showFloatingToolBar);
      document.removeEventListener(
        Events.PlaceholderAdded,
        handlePlaceholderAdd
      );
    };
  }, []);

  const makeBold = () => document.execCommand("bold");
  const makeItalic = () => document.execCommand("italic");
  const makeUnderline = () => document.execCommand("underline");

  // TODO: make this function a hook and move it to a separate file
  const makePlaceholder = () => {
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
      const spanError = modal.querySelector(
        "span.vanilla__error-message"
      ) as HTMLSpanElement;
      spanError.style.display = "block";
      input.classList.add("vanilla__error");
      input.focus();
      return;
    }
    // replace placeholder with the name
    const placeholder = $getPlaceholder(uniqueId);
    if (!placeholder) {
      return;
    }

    const placeholderName = input.value.trim();
    if (!$isPlaceholderNameUnique(placeholderName)) {
      // show a modal asking if they'd like to merge the placeholders
      const shouldMergePlaceholder = window.confirm(
        `A placeholder with the name "${placeholderName}" already exists. Would you like to merge the placeholders?`
      );
      if (shouldMergePlaceholder) {
        $mergePlaceholders(uniqueId, placeholderName);
        setRendered(!rendered);
        $closeModal(uniqueId);
        return;
      } else {
        modal.classList.add("vanilla__modal-error");
        const spanError = modal.querySelector(
          "span.vanilla__error-message"
        ) as HTMLSpanElement;
        spanError.style.display = "block";
        spanError.innerText = `"${placeholderName}" already in use. Please provide a new name or merge the placeholders.`;
        input.classList.add("vanilla__error");
        input.focus();
        return;
      }
    }
    placeholder.innerText = $placeholdify(placeholderName);
    addPlaceholderToSidePanel({ name: placeholderName, id: uniqueId });
    $setCaretAfterPlaceholder(placeholder);
    $closeModal(uniqueId);
    setRendered(!rendered);
  };

  const handleModalCancel = () => {
    if (!$closeModal(uniqueId)) return;
    if (!$undoPlaceholdify(uniqueId)) return;
    setRendered(!rendered);
  };

  return (
    <>
      <div className="vanilla__floating-toolbar">
        <button
          type="button"
          className="vanilla__floating-toolbar-button vanilla__btn-make-placeholder"
          title="placeholdify"
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
  modal.style.left = left - 200 + "px";
  modal.style.top = top + 70 + "px";

  // set focus on the input
  const input = modal.querySelector('input[type="text"]') as HTMLInputElement;
  input.value = selectedText;
  input.focus();
}

function onPlaceholderSidepanelDelete(placeholderId: string) {
  $undoPlaceholdify(placeholderId);
  const placeholderSidePanel = document.querySelector(
    "div.vanilla__placeholder-side-panel"
  ) as HTMLDivElement;
  const placeholderItem = document.querySelector(
    `div.vanilla__placeholder-item-${placeholderId}`
  ) as HTMLDivElement;
  placeholderSidePanel.removeChild(placeholderItem);
  store.dispatch(deletePlaceholder(placeholderId));
}

function addPlaceholderToSidePanel({ name, id }: { name: string; id: string }) {
  const placeholderSidePanel = document.querySelector(
    "div.vanilla__placeholder-side-panel"
  ) as HTMLDivElement;
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <PlaceholderItem placeholderId={id} placeholderName={name} count={1} />
  );
  placeholderSidePanel.insertAdjacentHTML("beforeend", htmlString);
  // publish a custom event
  const event = new CustomEvent(Events.PlaceholderAdded, {
    detail: { name, id },
  });
  document.dispatchEvent(event);
  store.dispatch(
    addPlaceholder({
      id,
      name,
      originalText: $getPlaceholderOriginalText(id) || name,
    })
  );
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

const $setCaretAfterPlaceholder = (placeholder: HTMLElement) => {
  const range = document.createRange();
  range.setStartAfter(placeholder);
  range.setEndAfter(placeholder);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
};
