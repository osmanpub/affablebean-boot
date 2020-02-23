import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import CartItem from "..";

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

const item = {
  product: {
    id: 1,
    description: "semi skimmed (1L)",
    name: "milk",
    price: 1.7,
    category: { id: 1, name: "dairy" },
    _links: {
      self: { href: "http://localhost:8080/api/products/1" },
      products: { href: "http://localhost:8080/api/products" }
    }
  },
  quantity: 1,
  total: 1.7
};

const cartItem = (
  <Provider store={store}>
    <CartItem index={0} item={item} />
  </Provider>
);

describe("<CartItem />", () => {
  it("renders correctly", () => {
    const component = renderer.create(cartItem).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show image", () => {
    const { getByAltText } = render(cartItem);
    const img = getByAltText(/milk/i);
    // @ts-ignore
    expect(img).toBeInTheDocument();
  });

  it("show name", () => {
    const { getByTestId } = render(cartItem);
    const name = getByTestId(/milk/i);
    // @ts-ignore
    expect(name).toBeInTheDocument();
  });

  it("show price", () => {
    const { getByTestId } = render(cartItem);
    const price = getByTestId(/1.7/i);
    // @ts-ignore
    expect(price).toBeInTheDocument();
  });

  it("show quantity", () => {
    const { getByDisplayValue } = render(cartItem);
    const input = getByDisplayValue("1");
    // @ts-ignore
    expect(input).toBeInTheDocument();
  });

  it("update quantity to 0", () => {
    const { getByDisplayValue } = render(cartItem);
    const input = getByDisplayValue("1");

    act(() => {
      fireEvent.change(input, { target: { value: "0" } });
    });

    // @ts-ignore
    expect(input.value).toBe("0"); // this would remove the item on update event
  });

  it("update quantity to 2", () => {
    const { getByDisplayValue } = render(cartItem);
    const input = getByDisplayValue("1");

    act(() => {
      fireEvent.change(input, { target: { value: "2" } });
    });

    // @ts-ignore
    expect(input.value).toBe("2");
  });

  it("update quantity to 'hello'", () => {
    const { getByDisplayValue } = render(cartItem);
    const input = getByDisplayValue("1");

    act(() => {
      fireEvent.change(input, { target: { value: "hello" } });
    });

    // @ts-ignore
    expect(input.value).toBe(""); // only numeric input
  });

  it("show update button", () => {
    const { getByText } = render(cartItem);
    const updateButton = getByText(/update/i);
    // @ts-ignore
    expect(updateButton).toBeInTheDocument();
  });
});
