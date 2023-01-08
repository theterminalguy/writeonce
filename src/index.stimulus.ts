import { Application, Controller } from "@hotwired/stimulus";

class HelloController extends Controller {
  onYes() {
    console.log("Yes");
  }
  onNo() {
    console.log("No");
  }
}

interface Window {
  Stimulus: Application;
}
declare var window: Window;
window.Stimulus = Application.start();
window.Stimulus.register("hello", HelloController);
