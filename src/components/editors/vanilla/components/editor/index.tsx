import "./index.css";
import FloatingToolBarPlugin from "../../plugins/FloatingToolBarPlugin";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

export default function Editor({ title }: { title: string }) {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);

  function navigateToQuickflow() {
    if (titleRef && titleRef.current) {
      if (!titleRef.current.textContent) {
        alert("Please Enter a Template Title");
        titleRef.current.focus();
        return;
      }
      navigate("/quickflow");
    }
  }

  return (
    <>
      <div
        className="vanilla__editor-container"
        data-controller="editors--vanilla-editor"
      >
        <h1
          contentEditable="true"
          suppressContentEditableWarning={true}
          className="vanilla__editor-title"
          placeholder={title}
          data-editors--vanilla-editor-target="title"
          data-action="focusout->editors--vanilla-editor#handleFocusOut"
          ref={titleRef}
        />
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="vanilla__editor"
          placeholder="Import, paste or start typing..."
          data-editors--vanilla-editor-target="content"
          data-action="focusout->editors--vanilla-editor#handleFocusOut"
        />
        <div className="vanilla__editor-btn-container">
          <button
            className="vanilla__floating-toolbar-button-base"
            type="button"
            onClick={navigateToQuickflow}
          >
            Use this template
          </button>
          <div className="vanilla__editor-word-count">
            <p>
              <span data-editors--vanilla-editor-target="charCount"></span>
            </p>
          </div>
        </div>
        <FloatingToolBarPlugin />
      </div>
    </>
  );
}
