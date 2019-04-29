import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";
import Home from "../containers/Home";
import reducer from "../reducers";

jest.mock("../net/categories");

let container;

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

  const cat = container.querySelector(".categoryImage");

  act(() => {
    cat.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // const label = container.querySelector('p');
  // expect(label.textContent).toBe('You clicked 0 times');
  // expect(document.title).toBe('You clicked 0 times');

  // // Test second render and componentDidUpdate
  // act(() => {
  //   button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  // });
  // expect(label.textContent).toBe('You clicked 1 times');
  // expect(document.title).toBe('You clicked 1 times');
});
