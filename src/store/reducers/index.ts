import { combineReducers } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension';


import counterReducer from "./counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  devTools: devToolsEnhancer({}),
});

export default rootReducer;
