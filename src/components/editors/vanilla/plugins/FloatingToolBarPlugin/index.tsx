import "./index.css";
export default function FloatingToolBarPlugin() {
  return (
    <div className="floating-toolbar">
      <button
        type="button"
        className="floating-toolbar-button btn-make-placeholder"
        title="Make placeholder"
      >{`{x}`}</button>
      <button type="button" className="floating-toolbar-button btn-make-bold" title="Bold">
        B
      </button>
      <button type="button" className="floating-toolbar-button btn-make-italic" title="Italic">
        I
      </button>
      <button
        type="button"
        className="floating-toolbar-button btn-make-underline"
        title="Underline"
      >
        U
      </button>
    </div>
  );
}
