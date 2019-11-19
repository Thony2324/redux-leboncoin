import { combineReducers } from "redux";
import { adsReducer } from "./adsReducer";
import { userReducer } from "./userReducer";

export const reducer = combineReducers({
  ads: adsReducer,
  currentUser: userReducer
});
