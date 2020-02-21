import { act, fireEvent, render } from "@testing-library/react";
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

const checkoutForm = (
  <Provider store={store}>
    <CheckoutForm />
  </Provider>
);

describe("<CheckoutForm />", () => {
  it("renders correctly", () => {
    const component = renderer.create(checkoutForm).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("show checkout paragraph", () => {
    const { getByTestId } = render(checkoutForm);
    const paragraph = getByTestId(/checkout-intro/i);
    expect(paragraph).toBeInTheDocument();
  });

  it("show checkout form", () => {
    const { getByRole } = render(checkoutForm);
    const paragraph = getByRole(/form/i);
    expect(paragraph).toBeInTheDocument();
  });

  it("show 5 input fields", () => {
    const { getAllByRole } = render(checkoutForm);
    const inputs = getAllByRole(/textbox/i);
    expect(inputs).toHaveLength(5);
  });

  it("set input name to 'osman'", () => {
    const { getByPlaceholderText } = render(checkoutForm);
    const input = getByPlaceholderText(
      /At least 3 chars and no more than 64 chars/i
    );

    act(() => {
      fireEvent.change(input, { target: { value: "osman" } });
    });

    expect(input.value).toBe("osman");
  });
});
