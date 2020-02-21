import { render } from "@testing-library/react";
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
    expect(component).toMatchSnapshot();
  });

  it("product image present", () => {
    const { getByAltText } = render(cartItem);
    const img = getByAltText(/milk/i);
    expect(img).toBeInTheDocument();
  });

  it("product name present", () => {
    const { getByTestId } = render(cartItem);
    const name = getByTestId(/milk/i);
    expect(name).toBeInTheDocument();
  });

  it("product price present", () => {
    const { getByTestId } = render(cartItem);
    const price = getByTestId(/1.7/i);
    expect(price).toBeInTheDocument();
  });

  it("update button present", () => {
    const { getByText } = render(cartItem);
    const updateButton = getByText(/update/i);
    expect(updateButton).toBeInTheDocument();
  });
});
