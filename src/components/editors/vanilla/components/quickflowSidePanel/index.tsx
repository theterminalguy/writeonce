import "./index.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PlaceholderState, updatePlaceholder } from "../../../../../store/features/placeholder/placeholderSlice";
import { store } from "../../../../../store";

export default function QuickflowSidePanel() {
  const [tab, setTab] = useState(1)
  const placeholders: PlaceholderState[] = useSelector((state: any) => state.editorState["placeholders"]);
  const setTabPanel = (index: number) => {
    setTab(index)
  }
  useEffect(() => {
    const placeholderFields = document.querySelectorAll(".quickflow__placeholder-type") as NodeListOf<HTMLElement>;
    const placeholderControls = Array.from(placeholderFields);
    for (let control of placeholderControls) {
      control.addEventListener("focusout", function (e) {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        const input = target as HTMLInputElement;
        const placeholder: any = input.getAttribute('data-placeholder');
        const data = JSON.parse(placeholder);
        store.dispatch(
          updatePlaceholder({ id: data.id, default: input.value })
        );
      });
    }
  })
  return (
    <div className="vanilla__sidepanel">
      <div className="vanilla__sidepanel">
        <div className="vanilla__placeholder-side-panel">
          <div>
            <div>
              <div className="tab">
                <button className={"tablinks " + (tab === 1 ? "active" : "")} onClick={() => setTabPanel(1)}>Data</button>
                <button className={"tablinks " + (tab === 2 ? "active" : "")} onClick={() => setTabPanel(2)}>Pipe</button>
              </div>
              <div style={{ display: tab === 1 ? "block" : "none" }}>
                {placeholders.map((placeholder: PlaceholderState) => {
                  return (
                    <div className="vanilla__placeholder-field" id="vanilla__field" key={placeholder.id}>
                      <label className="quickflow__sidebar-label">{placeholder.name}</label>
                      {placeholder.description !== "" ?
                        <p className="quickflow__sidebar-p">-{placeholder.description}</p>
                        : null}
                      <input defaultValue={placeholder.default} type={placeholder.dataType === 'string' ? 'text' : placeholder.dataType} id="" className="vanilla__form-controlx quickflow__placeholder-type" data-placeholder={JSON.stringify(placeholder)} />
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