import { Controller } from "@hotwired/stimulus";
import { $closeModal } from "../../components/editors/vanilla/components/modal/helpers";
import { $undoPlaceholdify } from "../../components/editors/vanilla/components/placeholder";
import { CustomEvents, dispatchCustomEvent } from "../../custom-events";

export default class RenamePlaceholderController extends Controller {
  static values = {
    modalId: String,
  };

  onYes() {
    console.log("Yes clicked")
  }

  onNo() {
    const placeholderId = this.modalIdValue;
    if (!$closeModal(this.modalIdValue)) return;
    if (!$undoPlaceholdify(placeholderId)) return;
    dispatchCustomEvent(CustomEvents.RerenderFloatingToolbar);
  }
}
