import { combineReducers } from "redux";
import { adsReducer } from "./adsReducer";
//import { accountReducer } from "./accountReducer";

export const reducer = combineReducers({
  ads: adsReducer
  //account: accountReducer
});
