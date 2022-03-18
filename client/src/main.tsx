import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import store from "../src/store"
import { Provider } from "react-redux";

import "./asserts/fontawesome-pro-5.12.0-web/css/all.css"
import "./index.css";


ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
