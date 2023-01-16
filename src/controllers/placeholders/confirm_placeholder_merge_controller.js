import { Controller } from "@hotwired/stimulus";
import { $mergePlaceholders } from "../../components/editors/vanilla/components/placeholder";
import { $closeModal, $showModal } from "../../components/editors/vanilla/components/modal/helpers";
import { CustomEvents } from '../../custom-events/index';
import { $addErrorToPromptModal } from "../../components/editors/vanilla/components/modal/prompt";

// see https://stimulus.hotwired.dev/reference/values#naming-conventions
export default class ConfirmPlaceholderMergeController extends Controller {
  static values = {
    modalId: String,
    placeholderId: String,
    placeholderName: String,
  };

  onYes() {
    $mergePlaceholders(this.placeholderIdValue, this.placeholderNameValue);
    $closeModal(this.modalIdValue);
    document.dispatchEvent(new CustomEvent(CustomEvents.RerenderFloatingToolbar));
  }

  onNo() {
    $closeModal(this.modalIdValue);
    const prevModal = $showModal(this.placeholderIdValue);
    $addErrorToPromptModal(
      prevModal,
      this.placeholderNameValue,
      `"${this.placeholderNameValue}" already in use. Please provide a new name or click ok to merge the placeholders.`
    );
    document.dispatchEvent(new CustomEvent(CustomEvents.RerenderFloatingToolbar));
  }
}
