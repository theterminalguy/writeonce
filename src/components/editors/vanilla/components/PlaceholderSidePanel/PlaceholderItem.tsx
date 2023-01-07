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
    <div
      className={`vanilla__placeholder-item vanilla__placeholder-item-${placeholderId}`}
    >
      <div className="vanilla__placeholder-item-header" data-controller="placeholder">
        <span className="vanilla__placeholder-item-name">
          {placeholderName}
        </span>
        <button
          type="button"
          onClick={() => console.log('delete....')}
          data-action="click->placeholder#deletePlaceholder"
          >Click Me</button>

        <button
          type="button"
          className={`vanilla__placeholder-item-delete vanilla__placeholder-item-delete-${placeholderId}`}
        >
          X
        </button>
      </div>
      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.placeholderType}>Type</label>
        <select
          id={htmlFor.placeholderType}
          className={`vanilla__form-control vanilla__form-control-${placeholderId}`}
          name="dataType"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.defaultValue}>Default value</label>
        <input
          type="text"
          id={htmlFor.defaultValue}
          className={`vanilla__form-control vanilla__form-control-${placeholderId}`}
          name="default"
        />
      </div>

      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.required}>Required</label>
        <input
          type="checkbox"
          id={htmlFor.required}
          className={`vanilla__form-control vanilla__form-control-${placeholderId}`}
          name="required"
        />
      </div>

      <div className="vanilla__placeholder-field">
        <label htmlFor={htmlFor.description}>Add description (optional)</label>
        <textarea
          id={htmlFor.description}
          cols={26}
          rows={3}
          maxLength={50}
          className={`vanilla__form-control vanilla__form-control-${placeholderId}`}
          name="description"
        ></textarea>
      </div>
    </div>
  );
}
