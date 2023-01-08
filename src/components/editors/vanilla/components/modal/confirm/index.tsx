import { useState } from "react";

import "../index.css";

interface StimulusConfig {
  controller: string;
  onYes: string;
  onNo: string;
}

type ModalProps = {
  id: string;
  message: string;
  config: StimulusConfig;
  defaultDisplay?: "none" | "block" | "inline" | "inline-block";
};

export default function ConfirmModal({
  id,
  message,
  config,
  defaultDisplay = "none",
}: ModalProps) {
  const [error] = useState(false);
  const htmlId = `title-${id}`;

  return (
    <div
      className={`vanilla__modal ${
        error ? "vanilla__modal-error" : ""
      } vanilla__modal-${id}`}
      style={{ display: defaultDisplay }}
      data-controller={config.controller}
    >
      <div className="vanilla__modal-content">
        <label htmlFor={htmlId}>{message}</label>
        <span className="vanilla__error-message">Required</span>
        <div className="vanilla__modal-buttons">
          <button
            type="button"
            data-action={`click->${config.controller}#${config.onYes}`}
          >
            Yes
          </button>
          <button
            type="button"
            data-action={`click->${config.controller}#${config.onNo}`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
