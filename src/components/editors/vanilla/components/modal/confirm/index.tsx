import { useState } from "react";

import "../index.css";
import { ModalType } from "../constants";

interface StimulusConfig {
  controller: string;
  onYes: string;
  onNo: string;
  data?: Record<string, string>;
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

  let dataAttributes = {
    [`data-${config.controller}-modal-id-value`]: id,
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
      data-modal-id={id}
      data-modal-type={ModalType.Confirm}
      data-controller={config.controller}
      {...dataAttributes}
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
