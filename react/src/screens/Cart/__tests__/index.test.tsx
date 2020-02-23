import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Cart from "..";

const mockStore = configureStore([thunk]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [
      {
        product: {
          id: 1,
          description: "semi skimmed (1L)",
          name: "milk",
          price: 1.7
        },
        quantity: 1,
        total: 1.7
      }
    ],
    numberOfItems: 1,
    subtotal: 1.7
  }
};

const store = mockStore(initialState);

const cart = (
  <Router>
    <Provider store={store}>
      <Cart
        match={{
          path: "/viewCart/:clear",
          url: "/viewCart/false",
          isExact: true,
          params: { clear: "false" }
        }}
      />
    </Provider>
  </Router>
);

describe("<Cart />", () => {
  it("renders correctly", () => {
    const component = renderer.create(cart).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show smaller navigatioal logo, on left", () => {
    const { getByAltText } = render(cart);
    const logo = getByAltText(/Affable Bean logo/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show larger logo, on right", () => {
    const { getByAltText } = render(cart);
    const logo = getByAltText(/the affable bean/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show proceed to checkout link", () => {
    const { getByText } = render(cart);
    const link = getByText(/proceed to checkout/i);
    // @ts-ignore
    expect(link).toBeVisible();
  });

  it("cart header total has 1 item", () => {
    const { getAllByText } = render(cart);
    const items = getAllByText(/1 items/i);
    // @ts-ignore
    expect(items[0]).toBeVisible();
  });

  it("show privacy", () => {
    const { getByTestId } = render(cart);
    const privacy = getByTestId(/footer-privacy/i);
    // @ts-ignore
    expect(privacy).toBeInTheDocument();
  });

  it("show contact", () => {
    const { getByTestId } = render(cart);
    const contact = getByTestId(/footer-contact/i);
    // @ts-ignore
    expect(contact).toBeInTheDocument();
  });
});

describe("<CartItem />", () => {
  it("update quantity to 2", () => {
    const { getByDisplayValue, getByText } = render(cart);
    const input = getByDisplayValue("1");
    const updateButton = getByText(/update/i);

    act(() => {
      fireEvent.change(input, { target: { value: "2" } });
      fireEvent.click(updateButton);
    });

    // @ts-ignore
    expect(input.value).toBe("2");
  });
});
