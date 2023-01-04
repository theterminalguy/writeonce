import PlaceholderItem from "./PlaceholderItem";
import "./index.css";

export default function PlaceholderSidePanel() {
  return (
    <div className="vanilla__placeholder-side-panel">
      <PlaceholderItem 
        placeholderId="placeholder-1"
        placeholderName="Placeholder 1"
      />
    </div>
  );
}
