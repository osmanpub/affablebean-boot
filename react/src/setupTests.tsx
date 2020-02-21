import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import reducer from "./redux";
import Cart from "./screens/Cart";
import CategoryProducts from "./screens/CategoryProducts";
import Checkout from "./screens/Checkout";
import Contact from "./screens/Contact";
import Home from "./screens/Home";
import Privacy from "./screens/Privacy";

// Fixes problem - https://stackoverflow.com/questions/48809753/testing-mutationobserver-with-jest
// @ts-ignore
global.MutationObserver = class {
  // @ts-ignore
  constructor(callback) {}
  // @ts-ignore
  disconnect() {}
  // @ts-ignore
  observe(element, initObject) {}
};

/**
 * Mock components and modules
 */
jest.mock("./net/cart");
jest.mock("./net/category");
jest.mock("./net/categories");
jest.mock("./net/checkout");
jest.mock("./net/subjects");

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
