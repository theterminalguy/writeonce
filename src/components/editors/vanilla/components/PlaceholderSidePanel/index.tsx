import './index.css'
import PlaceholderItem from './PlaceholderItem';

export default function PlaceholderSidePanel() {
  const placeholderItem = new PlaceholderItem();

  return (
    <div className="vanilla__placeholder-sidepanel-wrapper">
      <form name="vanilla__placeholder-side-panel">
        {placeholderItem.render()}
      </form>
    </div>
  );
}
