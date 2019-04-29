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

it("loads home page correctly", () => {
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

  const categories = container.querySelectorAll(".categoryBox");
  expect(categories.length).toBe(6);
});
