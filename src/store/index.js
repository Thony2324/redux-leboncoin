import { createStore } from "redux";
import { reducer } from "./reducers";

const devtool =
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(reducer, devtool);
