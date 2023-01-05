import "./App.css";
import VanillaEditor from "./components/editors/vanilla";
import { Storybook } from "./components/storybook";

function App() {
  // check if env is dev
  const showStoryBook = true;
  return (
    <>
    <div className="wrapper">
      <VanillaEditor />
    </div>
    {/* todo; this should be  in a separate component and route */}
      { showStoryBook && <Storybook /> }
    </>
  );
}

export default App;
