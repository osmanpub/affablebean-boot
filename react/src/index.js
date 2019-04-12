import React from "react";
import { render } from "react-dom";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import reducer from "./reducers";
import App from "./containers/App";
import CategoryProducts from "./containers/CategoryProducts";
import * as serviceWorker from "./serviceWorker";

const store = configureStore({
  reducer
});

render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/category/:id" component={CategoryProducts} />
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
