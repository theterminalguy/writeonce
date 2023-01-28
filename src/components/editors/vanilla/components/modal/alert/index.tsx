import { useState } from "react";

import "../index.css";
import { ModalType } from "../constants";

export default function AlertModal({
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
      data-modal-type={ModalType.Alert}
      data-controller={config.controller}
      {...dataAttributes}
    >
      <div className="vanilla__modal-content">
        <label htmlFor={htmlId}>{message}</label>
        <div className="vanilla__modal-buttons" style={{ textAlign: "center" }}>
          <button
            type="button"
            data-action={`click->${config.controller}#${config.onOk}`}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

interface StimulusConfig {
  controller: string;
  onOk: string;
  data?: Record<string, string>;
}

type ModalProps = {
  id: string;
  message: string;
  config: StimulusConfig;
  defaultDisplay?: "none" | "block" | "inline" | "inline-block";
};
