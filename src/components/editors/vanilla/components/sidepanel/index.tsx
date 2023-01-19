import './index.css';

export default function SidePanel({ component }: { component: JSX.Element }) {
  return (
    <div className="vanilla__sidepanel" style={{height: window.innerHeight}}>
        {component}
    </div>
  );
}
