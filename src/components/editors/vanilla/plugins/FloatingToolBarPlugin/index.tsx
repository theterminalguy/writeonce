import { useEffect, useState } from "react";
import { generate } from "shortid";
import ReactDOMServer from "react-dom/server";

import "./index.css";
import { $renderAndShowModal } from "../../components/modal/helpers";
import PromptModal from "../../components/modal/prompt";
import Placeholder, { $undoPlaceholdify, $getMaxPlaceholderCount, $getPlaceholderCount, $updatePlaceholderCounter } from "../../components/placeholder";
import { store } from "../../../../../store/index";
import { deletePlaceholder } from "../../../../../store/features/placeholder/placeholderSlice";
import {
  CustomEventDetailType,
  CustomEvents as Events,
} from "../../../../../custom-events";
import AlertModal from "../../components/modal/alert/index";
import Snackbar from "../../../../snackbar";

export default function FloatingToolBarPlugin({templateId}: {templateId: string}) {
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
    // we'll give the auth a heads up that there are other occurrences of the
    // same text in the document. We will tell them how many are an exact match
    // and how many are case insensitive matches.
    // An example message would be:
    // "There are 3 other occurrences of this text in the document. 2 of them are an exact match and 1 is a case insensitive match."

    if (selectedText !== "") {
      floatingToolBar.style.display = "block";
      console.log("select: ", selectionRect);
      floatingToolBar.style.left = selectionRect.left - 200 + "px";
      floatingToolBar.style.top = selectionRect.top + 20 + "px";
    } else {
      floatingToolBar.style.display = "none";
    }
  };

  const handlePlaceholderAdd = (e: Event) => {
    e.stopPropagation();

    const customEvent = e as CustomEvent<CustomEventDetailType>;
    const detail = customEvent.detail;
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
      // tell the auth to complete the previous action
      const appErrorNotification = ReactDOMServer.renderToStaticMarkup(
        <Snackbar
          message="⚠️ Please complete the previous action"
          position="bottom"
          animation="animate__fadeOutDown animate__delay-5s"
        />
      );
      document.body.insertAdjacentHTML("beforeend", appErrorNotification);

      const activeModal = document.querySelector(
        `div.vanilla__modal-${uniqueId}`
      ) as HTMLElement;
      activeModal.classList.add("animate__animated");
      activeModal.classList.add("animate__shakeX");
      const input = activeModal.querySelector(
        `input[type="text"]`
      ) as HTMLInputElement;
      input.focus();
      return;
    }

    const selection = window.getSelection();
    if (!selection || !$isRangeSelection(selection)) {
      return;
    }

    if ($getPlaceholderCount() >= $getMaxPlaceholderCount()) {
      const modal = ReactDOMServer.renderToStaticMarkup(
        <AlertModal
          id={uniqueId}
          message={`Placeholder limit reached (${$getMaxPlaceholderCount()})`}
          config={{
            controller: "placeholders--alert-modal",
            onOk: "onOk",
          }}
        />
      );
      const { left, top } = $getLeftTop(selection);
      $renderAndShowModal(modal, uniqueId, left, top);
      return;
    }


    if ($isSelectionPlaceholder(selection)) {
      const modal = ReactDOMServer.renderToStaticMarkup(
        <AlertModal
          id={uniqueId}
          message="You can't nest placeholders"
          config={{
            controller: "placeholders--alert-modal",
            onOk: "onOk",
          }}
        />
      );
      const { left, top } = $getLeftTop(selection);
      $renderAndShowModal(modal, uniqueId, left, top);
      return;
    }



    const selectedText = selection.toString();
    replaceSelectionWithPlaceholderNode(selection, selectedText, uniqueId);
    showRenamePlaceholderModal(selection, selectedText, uniqueId, templateId);

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
  modalId: string,
  templateId: string
) {
  const { left, top } = $getLeftTop(selection);
  const modal = ReactDOMServer.renderToStaticMarkup(
    <PromptModal
      id={modalId}
      templateId={templateId}
      title="Enter a name"
      config={{
        controller: "placeholders--rename-placeholder",
        onYes: "onYes",
        onNo: "onNo",
        onEnter: "onEnter",
      }}
    />
  );

  $renderAndShowModal(modal, modalId, left, top, selectedText);
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
  $updatePlaceholderCounter()
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
  if ($isLastText(selection)) {
    const textNode = document.createTextNode(".")
    selection.anchorNode?.parentNode?.append(textNode)
  }

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

const $getLeftTop = (selection: Selection) => {
  const { left, top } = $getSelectionRect(selection);
  const newLeft = left - 32;
  const newTop = top + 30;
  return { left: newLeft, top: newTop };
};

const $isLastText = (selection: Selection) => {
  const content = selection.anchorNode?.textContent
  if (!content) return
  const selectionOffset = selection.getRangeAt(0).endOffset
  const nodeOffset = content.length

  return nodeOffset === selectionOffset
}
