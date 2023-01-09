import "./index.css";
import FloatingToolBarPlugin from "../../plugins/FloatingToolBarPlugin";
import { useState } from "react";

// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

export default function Editor() {
  const [curState, setCurState] = useState(1)
  const tab = (index: number) => {
    setCurState(index)
  }
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
      <div className="vanilla__sidepanel">
        <div className="vanilla__sidepanel">
          <div className="vanilla__placeholder-side-panel">
            <div>
              <div className="vanilla__placeholder-item vanilla__placeholder-item-Y5ei-Cn52i">
                <div className="vanilla__placeholder-item-header" style={{ display: "flex" }}>
                  <div className="vanilla__placeholder-item-name" onClick={() => tab(1)}>Data</div>
                  <div className="vanilla__placeholder-item-name" onClick={() => tab(2)} style={{ paddingLeft: "40px" }} >Pipe</div>
                </div>
                <div style={{ display: curState === 1 ? "block" : "none" }}>
                  <div className="vanilla__placeholder-field" >
                    <label >Placeholder 1</label>
                    <input type="text" id="placeholder-type-Y5ei-Cn52i" className="vanilla__form-control vanilla__form-control-Y5ei-Cn52i" name="dataType" />
                  </div>
                  <div className="vanilla__placeholder-field">
                    <label >Datetime</label>
                    <input type="date" className="vanilla__form-control vanilla__form-control-Y5ei-Cn52i" />
                  </div>
                  <div className="vanilla__placeholder-field">
                    <label >Placeholder 3</label>
                    <textarea></textarea>
                  </div>
                </div>
                <div style={{ display: curState === 2 ? "block" : "none" }}>
                  <div>
                    Pipe here 
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
