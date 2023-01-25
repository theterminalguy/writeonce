import { Controller } from "@hotwired/stimulus";

export default class RenamePlaceholderController extends Controller {
  static values = {
    modalId: String,
    placeholderId: String,
    placeholderName: String,
  };

  onYes() {
  }

  onNo() {
  }
}
