import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Application } from "@hotwired/stimulus";
import PlaceholderController from "./components/editors/vanilla/components/PlaceholderSidePanel/placeholder_controller";

interface Window {
  Stimulus: Application;
}

declare var window: Window;
window.Stimulus = Application.start();
window.Stimulus.register("placeholder", PlaceholderController);


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
