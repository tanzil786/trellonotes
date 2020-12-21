import { combineReducers } from "redux";

import notesReducer from "./notesReducers";
import settingsReducer from "./settingsReducers";

export default combineReducers({
  notes: notesReducer,
  settings: settingsReducer,
});
