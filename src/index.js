import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import reducers from "./reducers";
import { loadState, saveState } from "./services";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const localState = loadState();
const store = createStore(
  reducers,
  localState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
