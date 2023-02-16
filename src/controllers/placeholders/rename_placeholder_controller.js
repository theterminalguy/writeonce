import { Controller } from "@hotwired/stimulus";
import ReactDOMServer from "react-dom/server";
import {
  $closeModal,
  $getModal,
  $replaceModal,
} from "../../components/editors/vanilla/components/modal/helpers";
import {
  $getPlaceholder,
  $getPlaceholderOriginalText,
  $isPlaceholderNameUnique,
  $placeholdify,
  $undoPlaceholdify,
  $getPlaceholderCount,
  $updatePlaceholderCounter,
  $getMaxPlaceholderCount,
} from "../../components/editors/vanilla/components/placeholder";
import { CustomEvents, dispatchCustomEvent } from "../../custom-events";

import ConfirmModal from "../../components/editors/vanilla/components/modal/confirm/index";
import PlaceholderItem from "../../components/editors/vanilla/components/PlaceholderSidePanel/PlaceholderItem";
import { store } from "../../store";
import { addPlaceholder } from "../../store/features/placeholder/placeholderSlice";
import { $addErrorToPromptModal } from "../../components/editors/vanilla/components/modal/prompt";

export default class RenamePlaceholderController extends Controller {
  static values = {
    modalId: String,
  };

  onYes() {
    const modal = $getModal(this.modalIdValue);
    if (!modal) {
      console.error("Modal not found");
      return;
    }
    const input = modal.querySelector(`input[type="text"]`);
    // validate placeholder name
    if (input.value.trim() === "") {
      // show error
      modal.classList.add("vanilla__modal-error");
      const spanError = modal.querySelector("span.vanilla__error-message");
      spanError.style.display = "block";
      input.classList.add("vanilla__error");
      input.focus();
      return;
    }

    const validPlaceholderNamePattern = /^(\w+\s)*\w+$/;
    if (!validPlaceholderNamePattern.test(input.value.trim())) {
      $addErrorToPromptModal(
        modal,
        input.value.trim(),
        "Placeholder must begin with a letter and only contain letters, numbers and underscores, with single spaces between words!"
      );
      return;
    }
    if (input.value.trim().length > 20) {
      $addErrorToPromptModal(
        modal,
        input.value.trim(),
        "Placeholder character length must be at most 20 characters!"
      );
      return;
    }
    // replace placeholder with the name
    const placeholder = $getPlaceholder(this.modalIdValue);
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
              "placeholder-id": this.modalIdValue,
              "placeholder-name": placeholderName,
            },
          }}
        />
      );
      $replaceModal(modal, newModal, newModalId);
      return;
    }
    placeholder.innerText = $placeholdify(placeholderName);
    addPlaceholderToSidePanel({ name: placeholderName, id: this.modalIdValue });
    $setCaretAfterPlaceholder(placeholder);
    $closeModal(this.modalIdValue);
    dispatchCustomEvent(CustomEvents.RerenderFloatingToolbar);
    $updatePlaceholderCounter();
  }

  onNo() {
    if (!$closeModal(this.modalIdValue)) return;
    if (!$undoPlaceholdify(this.modalIdValue)) return;
    dispatchCustomEvent(CustomEvents.RerenderFloatingToolbar);
  }

  onEnter(e) {
    e.preventDefault();
    this.onYes();
  }
}

function addPlaceholderToSidePanel({ name, id }) {
  const placeholderSidePanel = document.querySelector(
    "div.vanilla__placeholder-side-panel"
  );
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <PlaceholderItem placeholderId={id} placeholderName={name} count={1} />
  );
  placeholderSidePanel.insertAdjacentHTML("beforeend", htmlString);
  // publish a custom event
  const event = new CustomEvent(CustomEvents.PlaceholderAdded, {
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

function $setCaretAfterPlaceholder(placeholder) {
  const range = document.createRange();
  range.setStartAfter(placeholder);
  range.setEndAfter(placeholder);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}
