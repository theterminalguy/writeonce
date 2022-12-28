import { useId, useState } from "react";

import "./index.css";
export default function Modal({ title }: { title: string }) {
  const id = useId();
  const htmlId = `title-${id}`;

  const [error] = useState(false);

  return (
    <div className="vanilla__modal">
      <div className="vanilla__modal-content">
        <label htmlFor={htmlId}>{title}</label>
        <input type="text" id={htmlId} name={htmlId} required />
        {error && <span className="vanilla__error-message">Required</span>}
        <div className="vanilla__modal-buttons">
          <button type="button">OK</button>
          <button type="button">Cancel</button>
        </div>
      </div>
    </div>
  );
}
