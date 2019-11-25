import { combineReducers } from "redux";
import transactions from "./transactions";
import notifies from "./notifies";
import students from "./students";

const reducer = combineReducers({
  transactions: transactions,
  notifies: notifies,
  students: students
});

export default reducer;
