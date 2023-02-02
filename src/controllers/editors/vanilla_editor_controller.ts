import { Controller } from "@hotwired/stimulus";

export default class VanillaEditorController extends Controller {
  connect() {
    console.log("EditorController connect");
  }

  handleFocusOut() {
    console.log("VanillaEditorController handleFocusOut");
  }
}
