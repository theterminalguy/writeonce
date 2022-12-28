export default function NamePlaceholderModal() {
  return (
    <div className="vanilla__modal">
      <div className="vanilla__modal-content">
        <label htmlFor="placeholder-name">Enter a name</label>
        <input
          type="text"
          id="placeholder-name"
          name="placeholder-name"
          required
        />
        <span className="error-message">Required</span>
        <div className="vanilla__modal-buttons">
          <button type="button" id="btn-ok-modal">
            OK
          </button>
          <button type="button" id="btn-close-modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
