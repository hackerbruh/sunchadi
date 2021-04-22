import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./css/reset.css";
import App from "./app/layout/App";
import { configureStore } from "./app/store/configureStore";

import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}

render();
registerServiceWorker();
