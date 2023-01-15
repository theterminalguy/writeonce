import { Controller } from "@hotwired/stimulus";

// see https://stimulus.hotwired.dev/reference/values#naming-conventions
export default class ConfirmPlaceholderMergeController extends Controller {
  static values = {
    placeholderId: String,
    placeholderName: String,
  };

  onYes() {
    console.log("yes... merging placeholders");
    console.log(this.placeholderIdValue);
  }

  onNo() {
    console.log("no... not merging placeholders");
    console.log(this.placeholderNameValue);
  }
}
