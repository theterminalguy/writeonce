import { Controller } from "@hotwired/stimulus";

export default class AlertModalController extends Controller {
  onOk() {
    this.element.remove();
  }
}
