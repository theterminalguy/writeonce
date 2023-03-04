import "./index.css";
import FloatingToolBarPlugin from "../../plugins/FloatingToolBarPlugin";
import { useNavigate } from "react-router-dom";
import { EditorState } from '../../../../../store/features/editor/editorSlice';
import { useRef } from "react";
import { DefaultTemplateName } from '../../../../../util/helper';

// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

interface Editorprop {
  payload: EditorState;
}

export default function Editor({ ...props }: Editorprop) {
  const { templateName, id, contentHTML } = props.payload;
  const navigation = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleQuickflowNavigation = () => {
    if (titleRef.current && !titleRef.current.textContent) {
      alert("Please Enter a Template Title");
      titleRef.current.focus();
      return;
    }
    navigation(`/quickflow/${id}`);
  }

  // See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.


  return (
    <>
      <div
        className="vanilla__editor-container"
        data-controller="editors--vanilla-editor"
        data-editors--vanilla-editor-template-id-value={id}
      >
        <h1
          contentEditable="true"
          suppressContentEditableWarning={true}
          className="vanilla__editor-title"
          placeholder={templateName}
          data-editors--vanilla-editor-target="title"
          data-action="focusout->editors--vanilla-editor#handleFocusOut"
          ref={titleRef}
        >
          {templateName !== DefaultTemplateName ? templateName : ""}
        </h1>

        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="vanilla__editor"
          placeholder="Import, paste or start typing..."
          data-editors--vanilla-editor-target="content"
          data-action="focusout->editors--vanilla-editor#handleFocusOut"
          dangerouslySetInnerHTML={{ __html: contentHTML || "" }}
        ></div>
        <div className="vanilla__editor-btn-container">
          <button
            className="vanilla__floating-toolbar-button-base"
            type="button"
            onClick={handleQuickflowNavigation}
          >
            Use this template
          </button>

          <div className="vanilla__editor-word-count">
            <p>
              <span data-editors--vanilla-editor-target="charCount"></span>
            </p>
          </div>
        </div>
        <FloatingToolBarPlugin templateId={id} />
      </div>
    </>
  );
}
