import { Controller } from "@hotwired/stimulus";
import { $mergePlaceholders } from "../../components/editors/vanilla/components/placeholder";
import {
  $closeModal,
  $showModal,
} from "../../components/editors/vanilla/components/modal/helpers";
import { CustomEvents, dispatchCustomEvent } from "../../custom-events/index";
import { $addErrorToPromptModal } from "../../components/editors/vanilla/components/modal/prompt";

// see https://stimulus.hotwired.dev/reference/values#naming-conventions
export default class ConfirmPlaceholderMergeController extends Controller {
  static values = {
    modalId: String,
    placeholderId: String,
    placeholderName: String,
  };

  declare modalIdValue: string;
  declare placeholderIdValue: string;
  declare placeholderNameValue: string;

  onYes() {
    $mergePlaceholders(this.placeholderIdValue, this.placeholderNameValue);
    $closeModal(this.modalIdValue);
    dispatchCustomEvent(CustomEvents.RerenderFloatingToolbar);
  }

  onNo() {
    $closeModal(this.modalIdValue);
    const prevModal = $showModal(this.placeholderIdValue, 0, 0);
    $addErrorToPromptModal(
      prevModal,
      this.placeholderNameValue,
      `"${this.placeholderNameValue}" already in use. Please provide a new name or click ok to merge the placeholders.`
    );
    dispatchCustomEvent(CustomEvents.RerenderFloatingToolbar);
  }
}
