import { useState } from "react";

import "../index.css";
import { ModalType } from "../constants";

export default function PromptModal({
  id,
  title,
  hasInput = true,
  defaultDisplay = "none",
  handleOk,
  handleCancel,
}: ModalProps) {
  const [error] = useState(false);
  const htmlId = `title-${id}`;

  return (
    <div className={`vanilla__modal ${error ? "vanilla__modal-error" : ""} vanilla__modal-${id}`}
      style={{ display: defaultDisplay }}
      data-modal-id={id}
      data-modal-type={ModalType.Prompt}
      // add a target to the modal so that we can use event delegation
      // conditionall add attribute to the modal
      // if the modal is a prompt modal
      {...(hasInput && { "data-modal-has-input": true })} 
    >
      <div className="vanilla__modal-content">
        <label htmlFor={htmlId}>{title}</label>
        {hasInput && <input type="text" id={htmlId} name={htmlId} required /> }
        {error && <span className="vanilla__error-message">Required</span>}
        <span className="vanilla__error-message">Required</span>
        <div className="vanilla__modal-buttons">
          <button type="button" onClick={handleOk}>
            OK
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function $addErrorToPromptModal(
  modal: HTMLElement,
  inputVal: string,
  errorMessage: string
) {
  const modalType = modal.getAttribute("data-modal-type");
  if (!modalType) {
    throw new Error("modalType is undefined");
  }
  if (modalType !== ModalType.Prompt) {
    throw new Error("modalType is not Prompt");
  }
  modal.classList.add("vanilla__modal-error");
  const input = modal.querySelector(`input[type="text"]`) as HTMLInputElement;
  const spanError = modal.querySelector(
    "span.vanilla__error-message"
  ) as HTMLSpanElement;
  spanError.style.display = "block";
  spanError.innerText = errorMessage;
  input.classList.add("vanilla__error");
  input.value = inputVal;
  input.focus();
}

type ModalProps = {
  id: string;
  title: string;
  hasInput?: boolean;
  defaultDisplay?: "none" | "block" | "inline" | "inline-block";
  handleOk: () => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
