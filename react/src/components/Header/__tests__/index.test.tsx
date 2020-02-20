import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Header from "..";

const mockStore = configureStore([]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0
  }
};

const store = mockStore(initialState);

describe("<Header />", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(
        <Router>
          <Provider store={store}>
            <Header url="/" />
          </Provider>
          )
        </Router>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
