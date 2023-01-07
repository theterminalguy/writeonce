import { useEffect } from "react";
import "./index.css";

export default function PlaceholderSidePanel() {
  useEffect(() => {
    console.log('PlaceholderSidePanel mounted');
  });
  
  return (
    <div className="vanilla__placeholder-side-panel">
    </div>
  );
}
