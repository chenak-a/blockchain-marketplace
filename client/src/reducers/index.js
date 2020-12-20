import { combineReducers } from "redux";
import list from "./reducer1";
import mainpkg from "./reducer";

export default combineReducers({
  list,
  mainpkg,
});
