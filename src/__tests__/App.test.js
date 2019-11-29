import React from "react";
import ReactDOM from "react-dom";
import { store } from "../store";
import { Provider } from "react-redux";
import App from "../components/App";

describe("Pack render", () => {
  it("render App without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div); // Retire un composant React monté du DOM et nettoie ses gestionnaires d’événements et son état local
  });
});
