import { combineReducers } from "redux";

import counterReducer from "./counter/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
