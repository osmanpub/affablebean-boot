import { configureStore } from "@reduxjs/toolkit";
import React, { lazy, Suspense } from "react";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
// @ts-ignore
import AlertTemplate from "react-alert-template-basic";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import rootReducer from "./redux";
import * as serviceWorker from "./serviceWorker";
const Cart = lazy(() => import("./screens/Cart"));
const CategoryProducts = lazy(() => import("./screens/CategoryProducts"));
const Checkout = lazy(() => import("./screens/Checkout"));
const Contact = lazy(() => import("./screens/Contact"));
const Home = lazy(() => import("./screens/Home"));
const Privacy = lazy(() => import("./screens/Privacy"));

const alertOptions = {
  position: positions.MIDDLE,
  offset: "30px",
  transition: transitions.SCALE
};

const store = configureStore({
  reducer: rootReducer
});

render(
  // <React.StrictMode>
  <ErrorBoundary>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
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
      </AlertProvider>
    </Provider>
  </ErrorBoundary>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
