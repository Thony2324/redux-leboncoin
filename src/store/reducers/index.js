import { combineReducers } from "redux";
import { adsReducer } from "./adsReducer";

export const reducer = combineReducers({
  ads: adsReducer
});
