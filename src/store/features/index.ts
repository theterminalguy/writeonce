import { combineReducers } from "redux";

import counterReducer from "./counter/counterSlice";
import editorReducer from "./editor/editorSlice";
import placeholderReducer from "./placeholder/placeholderSlice";
import flowReducer from "./quickflow/quickflowSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  flowState: flowReducer,
  editorState: combineReducers({
    editor: editorReducer,
    placeholders: placeholderReducer,
  }),
});

export default rootReducer;
