import { combineReducers } from "redux";

import counterReducer from "./counter/counterSlice";
import editorReducer from "./editor/editorSlice";
import placeholderReducer from "./placeholder/placeholderSlice";
import authReducer from "./auth/authSlice";
import googleUserSlice from "./googleUser/googleUserSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  googleUser: googleUserSlice,
  editorState: combineReducers({
    editor: editorReducer,
    placeholders: placeholderReducer,
  }),
});

export default rootReducer;
