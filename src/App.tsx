import "./App.css";
import VanillaEditor from "./components/editors/vanilla";
import { Storybook } from "./components/storybook";

function App() {
  // check if env is dev
  const isDev = process.env.NODE_ENV === "development";
  return (
    <>
    <div className="wrapper">
      <VanillaEditor />
    </div>
      { isDev && <Storybook /> }
    </>
  );
}

export default App;
