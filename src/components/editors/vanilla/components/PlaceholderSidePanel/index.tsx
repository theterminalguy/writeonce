import { useEffect } from "react";
import "./index.css";
import { Events } from "../../../../events";
import { store } from "../../../../../store";
import { updatePlaceholder } from "../../../../../store/features/placeholder/placeholderSlice";

export default function PlaceholderSidePanel() {
  useEffect(() => {
    document.addEventListener(Events.PlaceholderAdded, function (e) {
      const customEvent = e as CustomEvent;
      const placeholder = customEvent.detail as {
        id: string;
        name: string;
      };
      const formControls = document.querySelectorAll(
        ".vanilla__form-control"
      ) as NodeListOf<HTMLElement>;

      formControls.forEach((control) => {
        control.addEventListener("focusout", function (e) {
          const target = e.target as HTMLElement;
          let value,
            name = "";
          if (target.tagName === "SELECT") {
            const select = target as HTMLSelectElement;
            const option = select.options[select.selectedIndex];
            value = option.value;
            name = select.name;
          } else if (target.tagName === "INPUT") {
            const input = target as HTMLInputElement;
            value = input.value;
            name = input.name;
          } else if (target.tagName === "TEXTAREA") {
            const textarea = target as HTMLTextAreaElement;
            value = textarea.value;
            name = textarea.name;
          }
          store.dispatch(updatePlaceholder({ ...placeholder, [name]: value }));
        });
      });
    });
  });

  return <div className="vanilla__placeholder-side-panel"></div>;
}
