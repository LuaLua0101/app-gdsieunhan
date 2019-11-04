import { combineReducers } from "redux";
import sideBar from "./sideBar";

const reducer = combineReducers({
  sideBar: sideBar
});

export default reducer;
