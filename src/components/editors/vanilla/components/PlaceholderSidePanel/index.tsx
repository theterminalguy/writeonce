import "./index.css";
import PlaceholderItem from "./PlaceholderItem";

export default function PlaceholderSidePanel() {
  const placeholderItem = new PlaceholderItem({
    placeholderName: "Placeholder name",
    placeholderId: "placeholder-id",
  });

  return (
    <div className="vanilla__placeholder-sidepanel-wrapper">
      <form name="vanilla__placeholder-side-panel">
        {placeholderItem.render()}
      </form>
    </div>
  );
}
