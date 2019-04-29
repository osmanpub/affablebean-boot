import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import Cart from ".";
import CategoryProducts from "../CategoryProducts";
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
          <Route path="/viewCart/:clear" component={Cart} />
        </Router>
      </Provider>
    );

    ReactDOM.render(home, container);
  });

  const category = container.querySelector(".categoryImage"); // dairy

  act(() => {
    category.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // add milk to cart
  const add = document.querySelector("tr button");

  act(() => {
    add.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const cart = document.querySelector("span.horizontalMargin");
  expect(cart.textContent).toContain("1 items");

  const viewCart = document.querySelectorAll("a.bubble")[1];

  act(() => {
    viewCart.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});

it("update milk quantity", () => {
  const input = container.querySelector("tr input");

  // act(() => {
  //   input.dispatchEvent(new KeyEvent("keyUp", { which: 50, bubbles: true }));
  // });

  const update = container.querySelector("tr button");

  // act(() => {
  //   update.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // });
});
