import { combineReducers } from "redux";

import counterReducer from "./counter/counterSlice";
import editorReducer from "./editor/editorSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  editor: editorReducer,
});

export default rootReducer;
