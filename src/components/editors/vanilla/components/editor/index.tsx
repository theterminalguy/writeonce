import { useEffect } from "react";

import "./index.css";
import FloatingToolBarPlugin from "../../plugins/FloatingToolBarPlugin";

// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

export default function Editor() {
  useEffect(() => {
    document.addEventListener("focusout", (e) => {
      const editor = e?.target as HTMLElement;
      if (!editor.classList.contains("vanilla__editor")) return;
      console.log("focusout", editor.innerHTML);
    });

    return () => {
      document.removeEventListener("focusout", () => {});
    };
  });
  
  return (
    <div className="vanilla__editor-container">
      <h1 contentEditable="true" suppressContentEditableWarning={true}>
        New Template
      </h1>
      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="vanilla__editor"
      >
        Vestibulum vel orci hendrerit ligula pharetra volutpat et sed dui.
        Phasellus vitae feugiat dolor. Mauris eleifend neque ac iaculis aliquet.
        Nunc malesuada nisi in dictum tristique. Vestibulum mauris eros, varius
        sed faucibus sed, pellentesque et nunc. Curabitur ultricies blandit
        urna. Pellentesque ut augue mollis, lacinia dui non, rutrum justo. Nunc
        et odio dapibus, blandit leo eget, aliquet urna. Etiam lorem dolor,
        vehicula a purus in, fermentum congue diam. Integer vel urna nec turpis
        posuere tempor eu lacinia purus. Praesent mattis viverra lacus bibendum
        fringilla. Nulla commodo posuere ante, at cursus est rhoncus quis. In
        iaculis viverra neque in blandit. Pellentesque eleifend arcu diam, sed
        sodales ligula pharetra at. Morbi ac nisl adipiscing sem interdum
        convallis.
      </div>
      <FloatingToolBarPlugin />
    </div>
  );
}
