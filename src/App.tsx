import { BrowserRouter, Router, Routes, Route, Navigate} from "react-router-dom";

import "./App.css";
import "./styles/buttons/button.css"
import VanillaEditor from "./components/editors/vanilla";
import { Storybook } from "./components/storybook";
import HomePage from './components/HomePage';
import Marketplace from "./components/marketplace";
import QuickflowPage from "./components/QuickFlowPage";
import Error404Page from "./components/Error404Page";
import {RootState, store} from "./store";
import {useState} from "react";
import {useSelector} from "react-redux";

function App(): JSX.Element {
    const [logIn, setLogIn ] = useState<boolean>(
        useSelector((state: RootState) => state.auth.signIn)
    )
  if (logIn){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage setLogIn={setLogIn}/>} />
                    <Route path="editor" element={<VanillaEditor />} />
                    <Route path="story" element={<Storybook />} />
                    <Route path="marketplace" element={<Marketplace />} />
                    <Route path="quickflow" element={<QuickflowPage />} />
                    <Route path="*" element={<Error404Page />} />
                </Routes>
            </BrowserRouter>
        </>

    );
  }else{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<HomePage setLogIn={setLogIn}/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
  }

}

export default App;
