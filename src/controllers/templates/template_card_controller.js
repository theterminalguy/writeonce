import { Controller } from "@hotwired/stimulus";

export default class TemplateCardController extends Controller {
  static targets = ["option"];

  handleOptionsClick(e) {
    this.optionTarget.focus();
    this.optionTarget.classList.toggle("active");
  }
  handleFocusOut(e) {
    this.optionTarget.classList.remove("active");
  }
}
