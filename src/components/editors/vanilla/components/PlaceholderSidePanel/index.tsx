import { useEffect } from "react";
import "./index.css";
import { Events } from "../../../../events";

export default function PlaceholderSidePanel() {
  useEffect(() => {
    document.addEventListener(Events.PlaceholderAdded, function (e) {
      const customEvent = e as CustomEvent;
      const placeholder = customEvent.detail as {
        id: string;
        name: string;
      }
      const formControl = document.querySelector(
        "select.vanilla__form-control"
      ) as HTMLElement;
      formControl.addEventListener("focusout", function (e) {
        // depending on the target, we should extract the value and update the placeholder
        const target = e.target as HTMLElement;
        // if the target is a select, we should extract the value from the selected option
        let value = "";
        if (target.tagName === "SELECT") {
          const select = target as HTMLSelectElement;
          const option = select.options[select.selectedIndex];
          value = option.value;
          console.log(value);
        }
        // if the target is an input, we should extract the value from the input
        if (target.tagName === "INPUT") {
          const input = target as HTMLInputElement;
          value = input.value;
          console.log(value);
        }
        // if the target is a textarea, we should extract the value from the textarea
        if (target.tagName === "TEXTAREA") {
          const textarea = target as HTMLTextAreaElement;
          value = textarea.value;
          console.log(value);
        }
        // // if the target is a checkbox, we should extract the value from the checkbox
        // if (target.tagName === "INPUT" && target.type === "checkbox") {
        //   const checkbox = target as HTMLInputElement;
        //   value = checkbox.checked.toString();
        //   console.log(value);
        // }
        // // if the target is a radio, we should extract the value from the radio
        // if (target.tagName === "INPUT" && target.type === "radio") {
        //   const radio = target as HTMLInputElement;
        //   value = radio.value;
        //   console.log(value);
        // }
        // TODO: support other form controls for example file, date, time, etc
      });
    });
  });

  return <div className="vanilla__placeholder-side-panel"></div>;
}
