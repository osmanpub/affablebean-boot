import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import Home from ".";
import reducer from "../../reducers";

jest.mock("../../net/categories");

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("loads a category product details", () => {
  act(() => {
    const store = configureStore({
      reducer
    });

    const home = (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Home} />
        </Router>
      </Provider>
    );

    ReactDOM.render(home, container);
  });

  const categories = container.querySelectorAll(".categoryBox");
  expect(categories.length).toBe(6);

  const greeting = document.querySelector("p");

  if (greeting) {
    expect(greeting.textContent).toBe(
      "Welcome to the online home of the Affable Bean Green Grocer."
    );
  }

  const headerLogo: any = document.querySelector("#logoText");

  if (headerLogo) {
    expect(headerLogo.alt).toBe("the affable bean");
  }

  const footerButtons = document.querySelectorAll(".btn-link");
  expect(footerButtons.length).toBe(2);

  const category = container.querySelector(".categoryImage");

  act(() => {
    category.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});
