import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Checkout from "..";

const mockStore = configureStore([]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0,
  },
  purchase: {
    didInvalidate: false,
    isPosting: false,
    order: {},
  },
  ui: {
    formErrors: [],
  },
};

const store = mockStore(initialState);

const checkout = (
  <Router>
    <Provider store={store}>
      <Checkout
        match={{
          path: "/checkout",
          url: "/checkout",
          isExact: true,
          params: {},
        }}
      />
    </Provider>
  </Router>
);

describe("<Checkout />", () => {
  it("renders correctly", () => {
    const component = renderer.create(checkout).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show smaller navigatioal logo, on left", () => {
    const { getByAltText } = render(checkout);
    const logo = getByAltText(/Affable Bean logo/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show larger logo, on right", () => {
    const { getByAltText } = render(checkout);
    const logo = getByAltText(/the affable bean/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("don't show view cart link", () => {
    const { getByText } = render(checkout);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show cart header total", () => {
    const { getByTestId } = render(checkout);
    const cart = getByTestId(/cart-hdr-total/i);
    // @ts-ignore
    expect(cart).not.toBeVisible();
  });

  it("show intro", () => {
    const { getByTestId } = render(checkout);
    const intro = getByTestId(/checkout-intro/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show contact", () => {
    const { getByTestId } = render(checkout);
    const contact = getByTestId(/footer-contact/i);
    // @ts-ignore
    expect(contact).toBeInTheDocument();
  });

  it("show privacy", () => {
    const { getByTestId } = render(checkout);
    const privacy = getByTestId(/footer-privacy/i);
    // @ts-ignore
    expect(privacy).toBeInTheDocument();
  });
});

describe("<Data entry />", () => {
  it("show intro", () => {
    const { getByTestId } = render(checkout);
    const intro = getByTestId(/checkout-intro/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show form", () => {
    const { getByRole } = render(checkout);
    const paragraph = getByRole(/form/i);
    // @ts-ignore
    expect(paragraph).toBeInTheDocument();
  });

  it("show 5 input fields", () => {
    const { getAllByRole } = render(checkout);
    const inputs = getAllByRole(/textbox/i);
    // @ts-ignore
    expect(inputs).toHaveLength(5);
  });

  it("set name to 'osman'", () => {
    const { getByTestId } = render(checkout);
    const input = getByTestId(/checkout-name/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman");
  });

  it("set phone to '1234567890'", () => {
    const { getByTestId } = render(checkout);
    const input = getByTestId(/checkout-phone/i);

    act(() => {
      fireEvent.change(input, { target: { value: "1234567890" } });
    });

    // @ts-ignore
    expect(input.value).toBe("1234567890");
  });

  it("set email to 'osman@gmail.com'", () => {
    const { getByTestId } = render(checkout);
    const input = getByTestId(/checkout-email/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman@gmail.com" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman@gmail.com");
  });

  it("set address to 'nobody cares where you live'", () => {
    const { getByTestId } = render(checkout);
    const input = getByTestId(/checkout-address/i);

    act(() => {
      fireEvent.change(input, {
        target: { value: "nobody cares where you live" },
      });
    });

    // @ts-ignore
    expect(input.value).toBe("nobody cares where you live");
  });

  it("set cc to '1234567890123456'", () => {
    const { getByTestId } = render(checkout);
    const input = getByTestId(/checkout-cc/i);

    act(() => {
      fireEvent.change(input, { target: { value: "1234567890123456" } });
    });

    // @ts-ignore
    expect(input.value).toBe("1234567890123456");
  });
});
