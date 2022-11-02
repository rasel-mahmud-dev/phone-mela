import React from "react";
import { createRoot } from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import App from "./App";

import store from "../src/store"
import { Provider } from "react-redux";

// import "./asserts/fontawesome-pro-5.12.0-web/css/all.css"
import "./index.css";

const container = document.getElementById('root');

// createRoot(container!) if you use TypeScript
const root = createRoot(container!);

root.render(
    <>
    <Provider store={store} >
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  </>
);


