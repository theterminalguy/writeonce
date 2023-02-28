import { Controller } from "@hotwired/stimulus";
import { store } from "../../store";
import { deleteTemplate } from "../../store/features/editor/editorSlice";

export default class TemplateCardController extends Controller {
  static targets = ["option", "templatecard"];
  static values = { templateId: String };

  handleOptionsClick(e) {
    this.optionTarget.focus();
    this.optionTarget.classList.toggle("active");
  }
  handleFocusOut(e) {
    this.optionTarget.classList.remove("active");
  }

  handleDelete(e) {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      const id = e.target.getAttribute("id");
      this.templatecardTarget.classList.add("remove");
      store.dispatch(deleteTemplate(id));
    }
  }

  handlePlaceholderInfo(e) {
    e.preventDefault();
    const templateId = this.templateIdValue;
    if (templateId === null) {
      return;
    }
    const editorState = store.getState().editorState;
    const placeholders =
      editorState.placeholders.filter((placeholder) => placeholder.templateId === templateId) || [];
    const template = editorState.editor.find((template) => template.id === templateId);
    const placeholderInfo = document.querySelector(
      ".vanilla__template-side-panel"
    );
    if (placeholderInfo.classList.contains("slide-in-right")) {
      placeholderInfo.classList.remove("slide-in-right");
      placeholderInfo.style.display = "none";
      return;
    }
    document.querySelector(".vanilla__template-placeholder-info h3").innerText =
      (template && template.templateName) || "";
    document.querySelector(
      ".vanilla__template-placeholder-info h5"
    ).innerText = `Edited ${(template && template.updated_at) || ""}`;
    document.querySelector(
      ".vanilla__template-placeholder-list h5"
    ).innerText = `Placeholder (${placeholders.length})`;
    let placeholderList = "";
    if (placeholders.length > 0) {
      placeholders.map((placeholder) => {
        placeholderList += `
          <div class="vanilla__placeholder-info">
              <span class="left">
                  <span class="icon"></span>
                  <span class="title">${placeholder.name}</span>
              </span>
              <span class="right">${placeholder.occurrences || 0}</span>
          </div>`;
      });
    }

    document.querySelector(".vanilla__template-placeholder-listing").innerHTML =
      placeholderList;
    placeholderInfo.classList.toggle("slide-in-right");
    placeholderInfo.style.display = "block";
  }
}
