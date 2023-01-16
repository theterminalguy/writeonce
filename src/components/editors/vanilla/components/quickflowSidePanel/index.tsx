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
      control.addEventListener("change", function (e) {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        const input = target as HTMLInputElement;
        const placeholder: any = input.getAttribute('data-placeholder');
        const data = JSON.parse(placeholder);
    
        if (data.required && input.value === "") {
          return input.focus();
        }
        store.dispatch(
          updatePlaceholder({ id: data.id, default: input.value })
        );
      });
    }
  })
  return (
    <div className="quickflow__sidepanel">
      <div>
        <div className="quickflow__tab">
          <button className={"tablinks " + (tab === 1 ? "active" : "")} onClick={() => setTabPanel(1)}>Data</button>
          <button className={"tablinks " + (tab === 2 ? "active" : "")} onClick={() => setTabPanel(2)}>Pipe</button>
        </div>
        <div style={{ display: tab === 1 ? "block" : "none" }}>
          {placeholders.map((placeholder: PlaceholderState) => {
            return (
              <div className="quickflow__placeholder-field" id="quickflow__field" key={placeholder.id}>
                <label htmlFor={placeholder.id} className="quickflow__sidebar-label">{placeholder.name} <span className="quickflow__sidebar-required">{placeholder.required ? "*" : null}</span></label>
                {placeholder.description !== "" ?
                  <p className="quickflow__sidebar-p">-{placeholder.description}</p>
                  : null}
                <input defaultValue={placeholder.default} type={placeholder.dataType === 'string' ? 'text' : placeholder.dataType} id={placeholder.id} className="quickflow__form-control quickflow__placeholder-type" data-placeholder={JSON.stringify(placeholder)} />
              </div>
            )
          })}
        </div>
        <div style={{ display: tab === 2 ? "block" : "none" }}>
          <div className="quickflow__placeholder-field" id="quickflow__field">
            <label>Active Pipe</label>
            <select className="quickflow__form-control">
              <option value="">select pipe</option>
              <option value="">PDF to Email</option>
              <option value="">Slack</option>
            </select>
          </div>
          <h4>Pipe Settings</h4>
          <div className="quickflow__placeholder-field" id="quickflow__field">
            <label>From GMail</label>
            <input type="text" className="quickflow__form-control" />
          </div>
          <div className="quickflow__placeholder-field" id="quickflow__field">
            <label>To GMail</label>
            <input type="text" className="quickflow__form-control" />
          </div>
          <div className="quickflow__placeholder-field" id="quickflow__field">
            <label>Attachment As</label>
            <select className="quickflow__form-control">
              <option defaultValue={""}>select</option>
              <option value="">PDF</option>
            </select>
          </div>
          <div className="quickflow__placeholder-field" id="quickflow__field">
            <button className="quickflow__sidebar-button">Run</button>
          </div>
        </div>
      </div>
    </div>
  );
}
