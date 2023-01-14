// replace modal replaces a modal with another modal.
// the first argument is the modal to replace,
// the second argument is the modal to replace it with
// the third argument is the props to pass to the new modal
// note; this function does not delete the old modal, it only hides it by

import { ModalType } from "./constants";
import { $closeModal } from "./prompt";

// setting the display to none and resetting any input fields if any
export function $replaceModal(oldModal: HTMLElement, newModal: string) {
  if (!oldModal.classList.contains("vanilla__modal")) {
    throw new Error("oldModal is not a modal");
  }
  // get the old modal left and top position
  const left = oldModal.style.left;
  const top = oldModal.style.top;

  // get the old modal type
  const modalType = oldModal.getAttribute("data-modal-type");

  // if it's a prompt modal, reset the input field
  if (modalType === ModalType.Prompt) {
    // get the modal id
    const modalId = oldModal.getAttribute("data-modal-id");
    if (!modalId) {
      throw new Error("modalId is undefined");
    }
    // close the modal
    $closeModal(modalId);
  }

  // append the new modal to the DOM
  document.body.insertAdjacentHTML("beforeend", newModal);

  // query the new modal and set the left and top position
    const nm = document.querySelector(`[data-modal-type="${ModalType.Confirm}"]`) as HTMLElement;
    if (!nm) {
        throw new Error("new modal is undefined");
    }
    nm.style.left = left;
    nm.style.top = top;
    nm.style.display = "block";
}
