import "./PlaceholderItem.css";

export default class PlaceholderItem {
  render(): JSX.Element {
    return (
      <div className="vanilla__placeholder-item ">
        <div className="vanilla__placeholder-item-header">
          <span className="vanilla__placeholder-item-name">
            Placeholder name
          </span>
          <button type="button" className="vanilla__placeholder-item-delete">
            X
          </button>
        </div>
        <div className="vanilla__placeholder-field">
          <label htmlFor="placeholder-type">Type</label>
          <select name="placeholder-type" id="placeholder-type">
            <option value="text">Text</option>
          </select>
        </div>

        <div className="vanilla__placeholder-field">
          <label htmlFor="default-value">Default value</label>
          <input type="text" id="default-value" name="default-value" />
        </div>

        <div className="vanilla__placeholder-field">
          <label htmlFor="required">Required</label>
          <input type="checkbox" id="required" name="required" />
        </div>

        <div className="vanilla__placeholder-field">
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
}
