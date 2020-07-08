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
    items: [],
    numberOfItems: 0,
    subtotal: 0,
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

  it("don't show view cart link", () => {
    const { getByText } = render(widgetBar);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show proceed to checkout link", () => {
    const { getByText } = render(widgetBar);
    const link = getByText(/proceed to checkout/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show cart header total", () => {
    const { getByTestId } = render(widgetBar);
    const cart = getByTestId(/cart-hdr-total/i);
    // @ts-ignore
    expect(cart).not.toBeVisible();
  });
});
