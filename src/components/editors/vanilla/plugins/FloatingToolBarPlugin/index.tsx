import { useEffect, useState } from "react";
import { generate } from "shortid";
import ReactDOMServer from "react-dom/server";

import "./index.css";
import {
  $closeModal,
  $getModal,
  $renderAndShowModal,
  $showModal,
} from "../../components/modal/helpers";
import PromptModal from "../../components/modal/prompt";
import Placeholder, {
  $getPlaceholder,
  $getPlaceholderOriginalText,
  $placeholdify,
  $undoPlaceholdify,
  $isPlaceholderNameUnique,
} from "../../components/placeholder";
import PlaceholderItem from "../../components/PlaceholderSidePanel/PlaceholderItem";
import { store } from "../../../../../store/index";
import {
  addPlaceholder,
  deletePlaceholder,
} from "../../../../../store/features/placeholder/placeholderSlice";
import { CustomEvents as Events } from "../../../../../custom-events";
import ConfirmModal from "../../components/modal/confirm";
import { $replaceModal } from "../../components/modal/helpers";

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

    // in a service worker, let's find all occurrences of the selected text
    // both the once that match exactly case sensitive and case insensitive
    // we'll give the user a heads up that there are other occurrences of the
    // same text in the document. We will tell them how many are an exact match
    // and how many are case insensitive matches.
    // An example message would be:
    // "There are 3 other occurrences of this text in the document. 2 of them are an exact match and 1 is a case insensitive match."

    if (selectedText !== "") {
      floatingToolBar.style.display = "block";
      floatingToolBar.style.left = selectionRect.left + 40 + "px";
      floatingToolBar.style.top = selectionRect.top - 60 + "px";
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
    document.addEventListener(Events.RerenderFloatingToolbar, () =>
      setRendered(!rendered)
    );
    return () => {
      editor.removeEventListener("mouseup", showFloatingToolBar);
      document.removeEventListener(
        Events.PlaceholderAdded,
        handlePlaceholderAdd
      );
    };
  }, [rendered]);

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
      const newModalId = "confirm-placeholder-merge";
      const newModal = ReactDOMServer.renderToStaticMarkup(
        <ConfirmModal
          id={newModalId}
          message={`A placeholder with the name "${placeholderName}" already exists. Would you like to merge the placeholders?`}
          defaultDisplay="block"
          config={{
            controller: "placeholders--confirm-placeholder-merge",
            onYes: "onYes",
            onNo: "onNo",
            data: {
              "placeholder-id": uniqueId,
              "placeholder-name": placeholderName,
            },
          }}
        />
      );
      $replaceModal(modal, newModal, newModalId);
      return;
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
      {/* <PromptModal id={uniqueId} title="Enter a name" /> */}
    </>
  );
}

function isModalVisible(modalId: string): boolean {
  const modal = document.querySelector(
    `div.vanilla__modal-${modalId}`
  ) as HTMLElement;
  if (!modal) {
    return false;
  }
  return modal.style.display === "block";
}

function showRenamePlaceholderModal(
  selection: Selection,
  selectedText: string,
  modalId: string
) {
  const { left, top } = $getSelectionRect(selection);
  const newLeft = left - 32;
  const newTop = top + 30;
  const modal = ReactDOMServer.renderToStaticMarkup(
    <PromptModal
      id={modalId}
      title="Enter a name"
      config={{
        controller: "placeholders--rename-placeholder",
        onYes: "onOk",
        onNo: "onCancel",
      }}
    />
  );

  $renderAndShowModal(modal, modalId, newLeft, newTop, selectedText);
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
