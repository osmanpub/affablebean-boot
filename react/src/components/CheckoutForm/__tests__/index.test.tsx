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
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show intro", () => {
    const { getByTestId } = render(checkoutForm);
    const intro = getByTestId(/checkout-intro/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show form", () => {
    const { getByRole } = render(checkoutForm);
    const paragraph = getByRole(/form/i);
    // @ts-ignore
    expect(paragraph).toBeInTheDocument();
  });

  it("show 5 input fields", () => {
    const { getAllByRole } = render(checkoutForm);
    const inputs = getAllByRole(/textbox/i);
    // @ts-ignore
    expect(inputs).toHaveLength(5);
  });

  it("show submit button", () => {
    const { getByRole } = render(checkoutForm);
    const button = getByRole(/button/i);
    // @ts-ignore
    expect(button).toBeInTheDocument();
  });

  it("set name to 'osman'", () => {
    const { getByTestId } = render(checkoutForm);
    const input = getByTestId(/checkout-name/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman");
  });

  it("set phone to '1234567890'", () => {
    const { getByTestId } = render(checkoutForm);
    const input = getByTestId(/checkout-phone/i);

    act(() => {
      fireEvent.change(input, { target: { value: "1234567890" } });
    });

    // @ts-ignore
    expect(input.value).toBe("1234567890");
  });

  it("set email to 'osman@gmail.com'", () => {
    const { getByTestId } = render(checkoutForm);
    const input = getByTestId(/checkout-email/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman@gmail.com" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman@gmail.com");
  });

  it("set address to 'nobody cares where you live'", () => {
    const { getByTestId } = render(checkoutForm);
    const input = getByTestId(/checkout-address/i);

    act(() => {
      fireEvent.change(input, {
        target: { value: "nobody cares where you live" }
      });
    });

    // @ts-ignore
    expect(input.value).toBe("nobody cares where you live");
  });

  it("set cc to '1234567890123456'", () => {
    const { getByTestId } = render(checkoutForm);
    const input = getByTestId(/checkout-cc/i);

    act(() => {
      fireEvent.change(input, { target: { value: "1234567890123456" } });
    });

    // @ts-ignore
    expect(input.value).toBe("1234567890123456");
  });
});
