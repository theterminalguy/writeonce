import "./index.css";
import { useState } from "react";
import { store } from "../../../../../store";
import { useSelector } from "react-redux";
import { PlaceholderState } from "../../../../../store/features/placeholder/placeholderSlice";
import { setFlow } from "../../../../../store/features/quickflow/quickflowSlice";
// See: https://stackoverflow.com/a/62522080/5045091 for the reason why we need to use `suppressContentEditableWarning={true}`.

export default function QuickflowSidePanel() {
  const [curState, setCurState] = useState(1)
  const placeholders: PlaceholderState[] = useSelector((state: any) => state.editorState["placeholders"]);
  const tab = (index: number) => {
    setCurState(index)
  }
  const setSideBarComponent = () => {
    store.dispatch(setFlow({componentName: "PlaceholderSidePanel"}))
  }

  return (
      <div className="vanilla__sidepanel">
        <div className="vanilla__sidepanel">
          <div className="vanilla__placeholder-side-panel">
            <div>
              <button onClick={setSideBarComponent}>&laquo; Back</button>
              <div className="vanilla__placeholder-item vanilla__placeholder-item-Y5ei-Cn52i">
                <div className="vanilla__placeholder-item-header" style={{ display: "flex" }}>
                  <div className="vanilla__placeholder-item-name" onClick={() => tab(1)}>Data</div>
                  <div className="vanilla__placeholder-item-name" onClick={() => tab(2)} style={{ paddingLeft: "40px" }} >Pipe</div>
                </div>
                <div style={{ display: curState === 1 ? "block" : "none" }}>
                  {placeholders.map((placeholder: PlaceholderState) => {
                    return (
                      <div className="vanilla__placeholder-field" >
                      <label >Placeholder 1</label>
                      <input type="text" id="placeholder-type-Y5ei-Cn52i" className="vanilla__form-control vanilla__form-control-Y5ei-Cn52i" name="dataType" />
                    </div>
                    )
                  })}
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
  );
}
