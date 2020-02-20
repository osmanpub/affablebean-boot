import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import CheckoutForm from "..";

const mockStore = configureStore([]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0
  },
  purchase: {
    didInvalidate: false,
    isPosting: false,
    order: {}
  },
  ui: {
    formErrors: []
  }
};

const store = mockStore(initialState);

describe("<CheckoutForm />", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <CheckoutForm />
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
