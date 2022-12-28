import "./index.css";
export default function FloatingToolBarPlugin() {
  const makeBold = () => document.execCommand("bold");
  const makeItalic = () => document.execCommand("italic");
  const makeUnderline = () => document.execCommand("underline");

  return (
    <div className="floating-toolbar">
      <button
        type="button"
        className="floating-toolbar-button btn-make-placeholder"
        title="Make placeholder"
        onClick={() => {
          console.log("clicked");
        }}
      >{`{x}`}</button>
      <button
        type="button"
        className="floating-toolbar-button btn-make-bold"
        title="Bold"
        onClick={makeBold}
      >
        B
      </button>
      <button
        type="button"
        className="floating-toolbar-button btn-make-italic"
        title="Italic"
        onClick={makeItalic}
      >
        I
      </button>
      <button
        type="button"
        className="floating-toolbar-button btn-make-underline"
        title="Underline"
        onClick={makeUnderline}
      >
        U
      </button>
    </div>
  );
}
