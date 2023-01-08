import { Controller } from "@hotwired/stimulus";

export default class HelloController extends Controller {
  onYes() {
    console.log("Yes");
  }
  onNo() {
    console.log("No");
  }
}
