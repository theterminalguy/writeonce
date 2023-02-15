import { BrowserRouter, Routes, Route} from "react-router-dom";

import "./App.css";
import "./styles/buttons/button.css"

import VanillaEditor from "./components/editors/vanilla";
import { Storybook } from "./components/storybook";
import HomePage from './components/HomePage';
import Marketplace from "./components/marketplace";
import Quickflow from "./components/QuickFlowPage";
import Error404Page from "./components/Error404Page";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="editor/:id" element={<VanillaEditor />} />
        <Route path="story" element={<Storybook />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="quickflow/:id" element={<Quickflow />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
