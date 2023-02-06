import "./index.css";
import FloatingToolBarPlugin from "../../plugins/FloatingToolBarPlugin";
import { Link } from "react-router-dom";

// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

export default function Editor({ title }: { title: string }) {
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
          data-editors--vanilla-editor-target="title"
          data-action="focusout->editors--vanilla-editor#handleFocusOut"
        >
          {title}
        </h1>
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="vanilla__editor"
          placeholder="Import, paste or start typing..."
          data-editors--vanilla-editor-target="content"
          data-action="focusout->editors--vanilla-editor#handleFocusOut"
        ></div>
        <div className="vanilla__editor-btn-container">
          <Link to="/quickflow">
            <button
              className="vanilla__floating-toolbar-button-base"
              type="button"
            >
              Use this template
            </button>
          </Link>

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
