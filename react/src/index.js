import React from "react";
import { render } from "react-dom";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import reducer from "./reducers";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

const store = configureStore({
  reducer
});

export default store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
