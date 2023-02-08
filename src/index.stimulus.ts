import { Application } from "@hotwired/stimulus";
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

interface Window {
  Stimulus: Application;
}
declare let window: Window;

const context = require.context("./controllers", true, /\.(ts|js)$/)
window.Stimulus = Application.start();
window.Stimulus.load(definitionsFromContext(context))
