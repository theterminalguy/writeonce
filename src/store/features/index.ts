import { combineReducers } from "redux";

import counterReducer from "./counter/counterSlice";
import editorReducer from "./editor/editorSlice";
import placeholderReducer from "./placeholder/placeholderSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  editor: editorReducer,
  placeholders: placeholderReducer,
});

export default rootReducer;
