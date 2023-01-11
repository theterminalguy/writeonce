import "./index.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PlaceholderState } from "../../../../../store/features/placeholder/placeholderSlice";

export default function QuickflowSidePanel() {
  const [tab, setTab] = useState(1)
  const placeholders: PlaceholderState[] = useSelector((state: any) => state.editorState["placeholders"]);
  const setTabPanel = (index: number) => {
    setTab(index)
  }
  return (
    <div className="vanilla__sidepanel">
      <div className="vanilla__sidepanel">
        <div className="vanilla__placeholder-side-panel">
          <div>
            <div className="vanilla__placeholder-item vanilla__placeholder-item-Y5ei-Cn52i">
              <div className="tab">
                <button className={"tablinks " + (tab === 1 ? "active" : "")} onClick={() => setTabPanel(1)}>Data</button>
                <button className={"tablinks " + (tab === 2 ? "active" : "")} onClick={() => setTabPanel(2)}>Pipe</button>
              </div>
              <div style={{ display: tab === 1 ? "block" : "none" }}>
                {placeholders.map((placeholder: PlaceholderState) => {
                  return (
                    <div className="vanilla__placeholder-field" id="vanilla__field">
                      <label>{placeholder.name}</label>
                      <input type={placeholder.dataType === 'string' ? 'text' : placeholder.dataType} id="placeholder-type-Y5ei-Cn52i" className="vanilla__form-control vanilla__form-control-Y5ei-Cn52i" name="dataType" />
                    </div>
                  )
                })}
              </div>
              <div style={{ display: tab === 2 ? "block" : "none" }}>
                <div className="vanilla__placeholder-field" id="vanilla__field">
                  <label>Active Pipe</label>
                  <select className="vanilla__form-control">
                    <option value="">select pipe</option>
                    <option value="">PDF to Email</option>
                    <option value="">Slack</option>
                  </select>
                </div>
                <h4>Pipe Settings</h4>
                <div className="vanilla__placeholder-field" id="vanilla__field">
                  <label>From GMail</label>
                  <input type="text" className="vanilla__form-control" />
                </div>
                <div className="vanilla__placeholder-field" id="vanilla__field">
                  <label>To GMail</label>
                  <input type="text" className="vanilla__form-control" />
                </div>
                <div className="vanilla__placeholder-field" id="vanilla__field">
                  <label>Attachment As</label>
                  <select className="vanilla__form-control">
                    <option value="">select</option>
                    <option value="">PDF</option>
                  </select>
                </div>
                <div className="vanilla__placeholder-field" id="vanilla__field">
                  <button className="vanilla__floating-toolbar-button quickflow__sidebar-button">Run</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}