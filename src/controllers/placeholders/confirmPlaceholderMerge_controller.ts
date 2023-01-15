import { Controller } from "@hotwired/stimulus";

export default class ConfirmPlaceholderMergeController extends Controller {
  static targets = ["modal"];

  connect() {
    // this.modalTarget.style.display = "block";
  }

  onYes() {
    console.log("yes... merging placeholders");
    // log the current modal
    console.log(this.targets.element);
  }

  onNo() {
    console.log("no... not merging placeholders");
  }
}
