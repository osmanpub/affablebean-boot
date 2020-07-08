import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import WidgetBar from "..";

const mockStore = configureStore([]);

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
          price: 1.7,
        },
        quantity: 1,
        total: 1.7,
      },
    ],
    numberOfItems: 1,
    subtotal: 1.7,
  },
};

const store = mockStore(initialState);

const widgetBar = (
  <Router>
    <Provider store={store}>
      <WidgetBar url="/" />
    </Provider>
    )
  </Router>
);

describe("<WidgetBar />", () => {
  it("renders correctly", () => {
    const component = renderer.create(widgetBar).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show view cart link", () => {
    const { getByText } = render(widgetBar);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).toBeVisible();
  });

  it("show proceed to checkout link", () => {
    const { getByText } = render(widgetBar);
    const link = getByText(/proceed to checkout/i);
    // @ts-ignore
    expect(link).toBeVisible();
  });

  it("cart header total has 1 item", () => {
    const { getByText } = render(widgetBar);
    const cart = getByText(/1 items/i);
    // @ts-ignore
    expect(cart).toBeVisible();
  });
});
