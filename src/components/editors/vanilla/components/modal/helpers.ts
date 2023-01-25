import { ModalType } from "./constants";

export function $replaceModal(
  oldModal: HTMLElement,
  newModal: string,
  newModalId: string
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

  $closeModal(modalId);
  document.body.insertAdjacentHTML("beforeend", newModal);
  const nm = $getModal(newModalId);
  if (!nm) {
    throw new Error("new modal is undefined");
  }
  nm.style.left = left;
  nm.style.top = top;
  nm.style.display = "block";
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

export function $showModal(
  modalId: string,
  left: number,
  top: number,
  promptText?: string
): HTMLElement {
  const modal = document.querySelector(
    `div.vanilla__modal-${modalId}`
  ) as HTMLElement;
  if (!modal) {
    throw new Error(`modal ${modalId} not found`);
  }
  modal.style.left = `${left}px`;
  modal.style.top = `${top}px`;
  modal.style.display = "block";

  const modalType = modal.getAttribute("data-modal-type");
  if (!modalType) {
    throw new Error("modalType is undefined");
  }

  if (modalType === ModalType.Prompt) {
    const input = modal.querySelector(`input[type="text"]`) as HTMLInputElement;
    input.value = promptText || "";
    input.focus();
  }
  return modal;
}

export function $renderModal(modal: string): void {
  document.body.insertAdjacentHTML("beforeend", modal);
}

export function $renderAndShowModal(
  modal: string,
  modalId: string,
  left: number,
  top: number,
  promptText?: string
): HTMLElement {
  $renderModal(modal);
  return $showModal(modalId, left, top, promptText);
}

export function $removeModal(modalId: string): void {
  const modal = $getModal(modalId);
  if (!modal) return;
  modal.remove();
}
