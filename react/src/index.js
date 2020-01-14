import { configureStore } from "@reduxjs/toolkit";
import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import rootReducer from "./redux";
import * as serviceWorker from "./serviceWorker";
const Cart = lazy(() => import("./containers/Cart"));
const CategoryProducts = lazy(() => import("./containers/CategoryProducts"));
const Checkout = lazy(() => import("./containers/Checkout"));
const Contact = lazy(() => import("./containers/Contact"));
const Home = lazy(() => import("./containers/Home"));
const Privacy = lazy(() => import("./containers/Privacy"));

const store = configureStore({
  reducer: rootReducer
});

render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/category/:id" component={CategoryProducts} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/viewCart/:clear" component={Cart} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
