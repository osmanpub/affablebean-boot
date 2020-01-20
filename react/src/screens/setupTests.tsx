import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import reducer from "../redux";
import Cart from "./Cart";
import CategoryProducts from "./CategoryProducts";
import Checkout from "./Checkout";
import Contact from "./Contact";
import Home from "./Home";
import Privacy from "./Privacy";

jest.mock("../net/cart");
jest.mock("../net/category");
jest.mock("../net/categories");
jest.mock("../net/checkout");

export let container: any;

export const setupAll = (callback?: Function) =>
  beforeAll(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    act(() => {
      const store = configureStore({
        reducer
      });

      const home = (
        <Provider store={store}>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/category/:id" component={CategoryProducts} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/viewCart/:clear" component={Cart} />
          </Router>
        </Provider>
      );

      ReactDOM.render(home, container);
    });

    callback && callback();
  });

export const changeValue = (widget: any, value: any) => {
  widget.value = value;
  ReactTestUtils.Simulate.change(widget);
};

export const mouseClick = (widget: any) =>
  act(() => {
    widget.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

export const afterAll = () => {
  document.body.removeChild(container);
  container = null;
};
