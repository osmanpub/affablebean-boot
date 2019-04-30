import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import Cart from "../Cart";
import CategoryProducts from "../CategoryProducts";
import Checkout from "../Checkout";
import Home from "../Home";
import reducer from "../../reducers";

jest.mock("../../net/categories");
jest.mock("../../net/cart");
jest.mock("../../net/category");

export let container;

export const setupAll = callback =>
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
            <Route path="/viewCart/:clear" component={Cart} />
          </Router>
        </Provider>
      );

      ReactDOM.render(home, container);
    });

    callback && callback();
  });

afterAll(() => {
  document.body.removeChild(container);
  container = null;
});
