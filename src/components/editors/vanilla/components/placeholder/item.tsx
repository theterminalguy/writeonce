export default function SidePanelItem() {
  return (
    <div className="placeholder-item">
      <div className="placeholder-name">
        <span className="placeholder-name-text"></span>
        <button type="button" className="btn-remove-placeholder">
          X
        </button>
      </div>
      <div className="field">
        <label htmlFor="placeholder-type">Type</label>
        <select name="placeholder-type" id="placeholder-type">
          <option value="text">Text</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="default-value">Default value</label>
        <input type="text" id="default-value" name="default-value" />
      </div>

      <div className="field">
        <label htmlFor="required">Required</label>
        <input type="checkbox" id="required" name="required" />
      </div>

      <div className="field">
        <label htmlFor="description">Add description (optional)</label>
        <textarea
          id="description"
          name="description"
          cols={26}
          rows={3}
          maxLength={50}
        ></textarea>
      </div>
    </div>
  );
}
