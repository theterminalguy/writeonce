import { useState } from "react";

import "./index.css";

type ModalProps = {
  id: string;
  title: string;
  hasInput?: boolean;
  defaultDisplay?: "none" | "block" | "inline" | "inline-block";
  handleOk: () => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Modal({
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

export const $getModal = (modalId: string): HTMLDivElement | null => {
  return document.querySelector(
    `div.vanilla__modal-${modalId}`
  ) as HTMLDivElement | null;
};

export const $closeModal = (modalId: string): boolean => {
  const modal = $getModal(modalId);
  if(!modal) return false;

  modal.style.display = "none";
  if (modal.classList.contains("vanilla__modal-error")) {
    modal.classList.remove("vanilla__modal-error");
  }
  const input = modal.querySelector(`input[type="text"]`) as HTMLInputElement;
  input.value = "";
  input.classList.remove("vanilla__error");
  const spanError = modal.querySelector(
    "span.vanilla__error-message"
  ) as HTMLSpanElement;
  spanError.style.display = "none";
  return true;
}
