import { BrowserRouter, Routes, Route} from "react-router-dom";

import "./App.css";
import VanillaEditor from "./components/editors/vanilla";
import { Storybook } from "./components/storybook";
import HomePage from './components/HomePage';
import Error404Page from "./components/Error404Page";
import QuickflowPage from "./components/QuickFlowPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="editor" element={<VanillaEditor />} />
        <Route path="story" element={<Storybook />} />
        <Route path="quickflow" element={<QuickflowPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
