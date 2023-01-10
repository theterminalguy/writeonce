import './index.css';
import { useSelector } from 'react-redux';

export default function SidePanel({ component }: { component: JSX.Element }) {
  const editorState = useSelector((state: any) => state.editorState);
  console.log(editorState);

  return (
    <>
      <div className="vanilla__sidepanel">
        {component}
      </div>
    </>
  );
}
function combinedReducers(arg0: {}): any {
  throw new Error('Function not implemented.');
}

