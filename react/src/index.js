import React from "react";
import { render } from "react-dom";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import reducer from "./reducers";
import Cart from "./containers/Cart";
import CategoryProducts from "./containers/CategoryProducts";
import Checkout from "./containers/Checkout";
import Confirmation from "./containers/Confirmation";
import Contact from "./containers/Contact";
import Home from "./containers/Home";
import Privacy from "./containers/Privacy";
import * as serviceWorker from "./serviceWorker";

const store = configureStore({
  reducer
});

render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/category/:id" component={CategoryProducts} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/feedback" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/viewCart/:clear" component={Cart} />
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
