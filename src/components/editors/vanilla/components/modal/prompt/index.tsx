import { useState } from "react";

import "../index.css";
import { ModalType } from "../constants";

export default function PromptModal({
  id,
  title,
  config,
  templateId,
  defaultDisplay = "none",
}: ModalProps) {
  const [error] = useState(false);
  const htmlId = `title-${id}`;

  let dataAttributes = {
    [`data-${config.controller}-modal-id-value`]: id,
    [`data-${config.controller}-template-id-value`]: templateId,
  };
  const data = config.data;
  if (data) {
    Object.keys(data).forEach((key) => {
      dataAttributes = {
        ...dataAttributes,
        [`data-${config.controller}-${key}-value`]: data[key],
      };
    });
  }
  return (
    <div
      className={`vanilla__modal ${
        error ? "vanilla__modal-error" : ""
      } vanilla__modal-${id}`}
      style={{ display: defaultDisplay }}
      data-controller={config.controller}
      data-modal-id={id}
      data-modal-type={ModalType.Prompt}
      {...dataAttributes}
    >
      <div className="vanilla__modal-content">
        <label htmlFor={htmlId}>{title}</label>
        <input type="text" id={htmlId} name={htmlId} required data-action={`keydown.enter->${config.controller}#${config.onEnter}`} />
        <span className="vanilla__error-message">Required</span>
        <div className="vanilla__modal-buttons">
          <button
            type="button"
            data-action={`click->${config.controller}#${config.onYes}`}
          >
            OK
          </button>
          <button
            type="button"
            data-action={`click->${config.controller}#${config.onNo}`}
          >
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
  config: StimulusConfig;
  templateId: string;
  defaultDisplay?: "none" | "block" | "inline" | "inline-block";
};

interface StimulusConfig {
  controller: string;
  onYes: string;
  onNo: string;
  onEnter: string;
  data?: Record<string, string>;
}
