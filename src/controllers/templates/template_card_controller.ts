import { Controller } from "@hotwired/stimulus";
import { store } from "../../store";
import { deleteTemplate } from "../../store/features/editor/editorSlice";
import { AppLogger } from "../../lib/logger";

const logger = new AppLogger("TemplateCardController");

export default class TemplateCardController extends Controller {
  static targets = ["option", "templatecard"];
  static values = { templateId: String };

  declare templateIdValue: string;
  declare readonly optionTarget: HTMLDivElement;
  declare readonly templatecardTarget: HTMLDivElement;

  handleOptionsClick() {
    this.optionTarget.focus();
    this.optionTarget.classList.toggle("active");
  }
  handleFocusOut() {
    this.optionTarget.classList.remove("active");
  }

  handleDelete(e: PointerEvent) {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      const id = this.templateIdValue;
      this.templatecardTarget.classList.add("remove");
      store.dispatch(deleteTemplate(id));
    }
  }

  handlePlaceholderInfo(e: PointerEvent) {
    e.preventDefault();
    const templateId = this.templateIdValue;
    if (templateId === null) {
      return;
    }
    const editorState = store.getState().editorState;
    const placeholders =
      editorState.placeholders.filter(
        (placeholder) => placeholder.templateId === templateId
      ) || [];
    const template = editorState.editor.find(
      (template) => template.id === templateId
    );
    const placeholderInfo = document.querySelector<HTMLDivElement>(
      ".vanilla__template-side-panel"
    );
    if (!placeholderInfo) {
      logger.error("Placeholder info not found");
      return;
    }
    if (placeholderInfo.classList.contains("slide-in-right")) {
      placeholderInfo.classList.remove("slide-in-right");
      placeholderInfo.style.display = "none";
      return;
    }
    // Get placeholderinfo-h3 and set text content to templateName
    const placeholderInfoHeading3 = document.querySelector<HTMLDivElement>(
      ".vanilla__template-placeholder-info h3"
    );
    if (!placeholderInfoHeading3) {
      logger.error("Placeholder Info Header-3 Not Found");
      return;
    }
    placeholderInfoHeading3.innerText =
      (template && template.templateName) || "";
    // Get placeholderinfo-h5 and set text content to updated_at
    const placeholderInfoHeading5 = document.querySelector<HTMLDivElement>(
      ".vanilla__template-placeholder-info h5"
    );
    if (!placeholderInfoHeading5) {
      logger.error("Placeholder Info Header-5 Not Found");
      return;
    }
    placeholderInfoHeading5.innerText = `Edited ${
      (template && template.updated_at) || ""
    }`;
    // Get placeholderlist-h5 and set text content to updated_at
    const placeholderListHeading5 = document.querySelector<HTMLDivElement>(
      ".vanilla__template-placeholder-list h5"
    );
    if (!placeholderListHeading5) {
      logger.error("Placeholder List Header-5 Not Found");
      return;
    }
    placeholderListHeading5.innerText = `Placeholder (${placeholders.length})`;
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

    const placeholderListing = document.querySelector<HTMLUListElement>(
      ".vanilla__template-placeholder-listing"
    );
    if (!placeholderListing) {
      logger.error("Placeholder Listing not found");
      return;
    }
    placeholderListing.innerHTML = placeholderList;
    placeholderInfo.classList.toggle("slide-in-right");
    placeholderInfo.style.display = "block";
  }
}
