import { combineReducers } from "redux";
import transactions from "./transactions";
import notifies from "./notifies";

const reducer = combineReducers({
  transactions: transactions,
  notifies: notifies
});

export default reducer;
