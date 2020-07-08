import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import reducer from "../../../redux";
import { changeValue, mouseClick } from "../../../setupTests";
import Cart from "../../Cart";
import CategoryProducts from "../../CategoryProducts";
import Home from "../../Home";

/**
 * Mock components and modules
 */
jest.mock("../../../net/cart");
jest.mock("../../../net/category");
jest.mock("../../../net/categories");

let container: any;

describe("alternate product screen tests", () => {
  beforeAll(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    act(() => {
      const store = configureStore({
        reducer,
      });

      const home = (
        <Provider store={store}>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/category/:id" component={CategoryProducts} />
          </Router>
        </Provider>
      );

      ReactDOM.render(home, container);
    });
  });

  it("add milk product", () => {
    act(() => {
      mouseClick(container.querySelector('[data-testid="category-dairy"]')); // dairy category
    });

    act(() => {
      mouseClick(container.querySelector('[data-testid="add-qty-milk"]')); // add milk to cart
    });

    const cart = container.querySelector('[data-testid="cart-hdr-total"]');
    // @ts-ignore
    expect(cart.textContent).toContain("1 items");
  });

  afterAll = () => {
    document.body.removeChild(container);
    container = null;
  };
});
