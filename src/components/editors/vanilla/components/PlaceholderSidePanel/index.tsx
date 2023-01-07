import { useEffect } from "react";
import "./index.css";
import { Events } from "../../../../events";
import { store } from "../../../../../store";
import { updatePlaceholder } from "../../../../../store/features/placeholder/placeholderSlice";

export default function PlaceholderSidePanel() {
  useEffect(() => {
    document.addEventListener(Events.PlaceholderAdded, function (e) {
      // stop propagation to prevent the event from being handled by the editor
      e.stopPropagation();
      const customEvent = e as CustomEvent;
      const placeholder = customEvent.detail as {
        id: string;
        name: string;
      };
      const formControls = document.querySelectorAll(
        `.vanilla__form-control-${placeholder.id}`
      ) as NodeListOf<HTMLElement>;

      formControls.forEach((control) => {
        control.addEventListener("focusout", function (e) {
          e.stopPropagation();
          const target = e.target as HTMLElement;
          let value: string | boolean;
          let name: string;
          if (target.tagName === "SELECT") {
            const select = target as HTMLSelectElement;
            const option = select.options[select.selectedIndex];
            value = option.value;
            name = select.name;
          } else if (target.tagName === "INPUT") {
            const input = target as HTMLInputElement;
            value = input.type === "checkbox" ? input.checked : input.value;
            name = input.name;
          } else if (target.tagName === "TEXTAREA") {
            const textarea = target as HTMLTextAreaElement;
            value = textarea.value;
            name = textarea.name;
          } else {
            // TODO: Handle other types of form controls
            return;
          }
          store.dispatch(
            updatePlaceholder({ id: placeholder.id, [name]: value })
          );
        });
      });
    });
  });

  return <div className="vanilla__placeholder-side-panel"></div>;
}
