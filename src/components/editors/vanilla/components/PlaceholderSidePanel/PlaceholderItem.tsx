import "./PlaceholderItem.css";

type PlaceholderItemProps = {
  placeholderName: string;
  placeholderId: string;
};

export default function PlaceholderItem({
  placeholderName,
  placeholderId,
}: PlaceholderItemProps) {
  const htmlFor = {
    placeholderType: `placeholder-type-${placeholderId}`,
    defaultValue: `default-value-${placeholderId}`,
    required: `required-${placeholderId}`,
    description: `description-${placeholderId}`,
  };

  return (
    <div className="vanilla__placeholder-item ">
      <div className="vanilla__placeholder-item-header">
        <span className="vanilla__placeholder-item-name">
          {placeholderName}
        </span>
        <button type="button" className="vanilla__placeholder-item-delete">
          X
        </button>
      </div>
      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.placeholderType}>Type</label>
        <select id={htmlFor.placeholderType}>
          <option value="text">Text</option>
        </select>
      </div>

      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.defaultValue}>Default value</label>
        <input type="text" id={htmlFor.defaultValue} />
      </div>

      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.required}>Required</label>
        <input type="checkbox" id={htmlFor.required} />
      </div>

      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.description}>Add description (optional)</label>
        <textarea
          id={htmlFor.description}
          cols={26}
          rows={3}
          maxLength={50}
        ></textarea>
      </div>
    </div>
  );
}
