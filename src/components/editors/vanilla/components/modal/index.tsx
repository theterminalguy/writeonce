import { useId, useState } from "react";

import "./index.css";

type ModalProps = {
  title: string;
  handleOk: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Modal({ title, handleOk, handleCancel } : ModalProps) {
  const [error] = useState(false);
  const id = useId();
  const htmlId = `title-${id}`;

  return (
    <div className="vanilla__modal">
      <div className="vanilla__modal-content">
        <label htmlFor={htmlId}>{title}</label>
        <input type="text" id={htmlId} name={htmlId} required />
        {error && <span className="vanilla__error-message">Required</span>}
        <div className="vanilla__modal-buttons">
          <button type="button" onClick={handleOk}>OK</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
