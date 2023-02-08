import './index.css';

export default function SidePanel({ component }: { component: JSX.Element }) {
  return (
    <div className="vanilla__sidepanel" style={{height: window.innerHeight}}>
      <div className="vanilla__placeholder-count">
        <span className="vanilla__title">Placeholders left</span>
        <span className="vanilla__counter">10</span>
      </div>
        {component}
    </div>
  );
}
