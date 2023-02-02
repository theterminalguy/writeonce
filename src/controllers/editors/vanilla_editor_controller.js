import { Controller } from "@hotwired/stimulus";
import { store } from "../../store";
import { setTemplateContent, setTemplateName } from "../../store/features/editor/editorSlice";

export default class VanillaEditorController extends Controller {
  static targets = ["title", "content"];

  connect() {
    this.contentTarget.focus();
  }

  handleFocusOut(event) {
    if (event.target === this.titleTarget) {
      store.dispatch(
        setTemplateName(
          this.titleTarget.innerText
        )
      )
    }

    if (event.target === this.contentTarget) {
      store.dispatch(
        setTemplateContent({
          contentText: this.contentTarget.innerText,
          contentHTML: this.contentTarget.innerHTML
        })
      )
    }
  }
}
