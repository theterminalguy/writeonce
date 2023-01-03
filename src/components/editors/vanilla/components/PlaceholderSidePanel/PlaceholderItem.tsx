import "./PlaceholderItem.css";

type PlaceholderItemProps = {
  placeholderName: string;
  placeholderId: string;
};

export default class PlaceholderItem {
  placeholderName: string;
  placeholderId: string;
  htmlFor: {
    placeholderType: string;
    defaultValue: string;
    required: string;
    description: string;
  };

  constructor({ placeholderName, placeholderId }: PlaceholderItemProps) {
    this.placeholderName = placeholderName;
    this.placeholderId = placeholderId;

    this.htmlFor = {
      placeholderType: `placeholder-type-${this.placeholderId}`,
      defaultValue: `default-value-${this.placeholderId}`,
      required: `required-${this.placeholderId}`,
      description: `description-${this.placeholderId}`,
    };
  }

  render(): JSX.Element {
    return (
      <div className="vanilla__placeholder-item ">
        <div className="vanilla__placeholder-item-header">
          <span className="vanilla__placeholder-item-name">
            {this.placeholderName}
          </span>
          <button type="button" className="vanilla__placeholder-item-delete">
            X
          </button>
        </div>
        <div className="vanilla__placeholder-field">
          <label htmlFor={this.htmlFor.placeholderType}>Type</label>
          <select id={this.htmlFor.placeholderType}>
            <option value="text">Text</option>
          </select>
        </div>

        <div className="vanilla__placeholder-field">
          <label htmlFor={this.htmlFor.defaultValue}>Default value</label>
          <input type="text" id={this.htmlFor.defaultValue} />
        </div>

        <div className="vanilla__placeholder-field">
          <label htmlFor={this.htmlFor.required}>Required</label>
          <input type="checkbox" id={this.htmlFor.required} />
        </div>

        <div className="vanilla__placeholder-field">
          <label htmlFor={this.htmlFor.description}>
            Add description (optional)
          </label>
          <textarea
            id={this.htmlFor.description}
            cols={26}
            rows={3}
            maxLength={50}
          ></textarea>
        </div>
      </div>
    );
  }
}
