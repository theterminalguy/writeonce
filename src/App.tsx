import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./styles/buttons/button.css"
import VanillaEditor from "./components/editors/vanilla";
import { Storybook } from "./components/storybook";
import HomePage from './components/HomePage';
import Marketplace from "./components/marketplace";
import Quickflow from "./components/QuickFlowPage";
import Error404Page from "./components/Error404Page";
import { RootState } from "./store";
import { useState } from "react";
import { useSelector } from "react-redux";
import TemplatePage from "./components/templates"

function App(): JSX.Element {
  const [logIn, setLogIn] = useState<boolean>(
    useSelector((state: RootState) => state.auth.signIn)
  )
  if (logIn) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage setLogIn={setLogIn} />} />
            <Route path="editor/:slug" element={<VanillaEditor />} />
            <Route path="story" element={<Storybook />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="quickflow/:id" element={<Quickflow />} />
            <Route path="story" element={<Storybook />} />
            <Route path="templates" element={<TemplatePage />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </BrowserRouter>
      </>

    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<HomePage setLogIn={setLogIn} />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
export default App;
