import { ModalType } from "./constants";

export function $replaceModal(
  oldModal: HTMLElement,
  newModal: string,
  newModalId: string,
  props?: any
) {
  if (!oldModal.classList.contains("vanilla__modal")) {
    throw new Error("oldModal is not a modal");
  }
  // get the old modal left and top position
  const left = oldModal.style.left;
  const top = oldModal.style.top;

  // get the modal id
  const modalId = oldModal.getAttribute("data-modal-id");
  if (!modalId) {
    throw new Error("modalId is undefined");
  }
  // close the modal
  $closeModal(modalId);
  document.body.insertAdjacentHTML("beforeend", newModal);

  const nm = $getModal(newModalId);
  if (!nm) {
    throw new Error("new modal is undefined");
  }
  nm.style.left = left;
  nm.style.top = top;
  nm.style.display = "block";
  // add the props to the new modal as data attributes
  if (props) {
    Object.keys(props).forEach((key) => {
      nm.setAttribute(`data-modal-var-${key}`, props[key]);
    });
  }
}

export function $closeModal(modalId: string): boolean {
  const modal = $getModal(modalId);
  if (!modal) return false;

  const modalType = modal.getAttribute("data-modal-type");
  if (!modalType) {
    throw new Error("modalType is undefined");
  }

  const modalHasError = modal.classList.contains("vanilla__modal-error");
  if (modalType === ModalType.Prompt) {
    const input = modal.querySelector(`input[type="text"]`) as HTMLInputElement;
    input.value = "";
    if (modalHasError) {
      input.classList.remove("vanilla__error");
      const spanError = modal.querySelector(
        "span.vanilla__error-message"
      ) as HTMLSpanElement;
      spanError.style.display = "none";
    }
  }
  if (modalHasError) {
    modal.classList.remove("vanilla__modal-error");
  }
  modal.style.display = "none";

  return true;
}

export function $getModal(modalId: string): HTMLDivElement | null {
  return document.querySelector(
    `div.vanilla__modal-${modalId}`
  ) as HTMLDivElement | null;
}
