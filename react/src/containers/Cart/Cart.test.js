import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import CategoryProducts from ".";
import Home from "../Home";
import reducer from "../../reducers";

jest.mock("../../net/cart");
jest.mock("../../net/category");
jest.mock("../../net/categories");

let container;

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
        </Router>
      </Provider>
    );

    ReactDOM.render(home, container);
  });
});

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});

it("loads all products for dairy category", () => {
  const category = container.querySelector(".categoryImage"); // dairy

  act(() => {
    category.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const categories = container.querySelectorAll("span.categoryText");
  expect(categories.length).toBe(6);

  let rows = container.querySelectorAll("tr.white");
  expect(rows.length).toBe(2);

  rows = container.querySelectorAll("tr.lightBlue");
  expect(rows.length).toBe(2);

  // add milk to cart
  const add = document.querySelector("tr button");

  act(() => {
    add.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const cart = document.querySelector("span.horizontalMargin");
  expect(cart.textContent).toContain("1 items");

  // view cart
  const viewCart = document.querySelectorAll("a.bubble")[1];

  act(() => {
    add.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});
