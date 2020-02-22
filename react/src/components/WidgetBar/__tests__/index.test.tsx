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
        name: "butter",
        price: 1.09,
        description: "unsalted (250g)"
      }
    ],
    numberOfItems: 1,
    subtotal: 1.09
  }
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

  it("shows view cart link", () => {
    const { getByText } = render(widgetBar);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).toBeInTheDocument();
  });

  it("shows proceed to checkout link", () => {
    const { getByText } = render(widgetBar);
    const link = getByText(/proceed to checkout/i);
    // @ts-ignore
    expect(link).toBeInTheDocument();
  });

  it("cart header total has 1 item", () => {
    const { getByText } = render(widgetBar);
    const cart = getByText(/1 items/i);
    // @ts-ignore
    expect(cart).toBeInTheDocument();
  });
});
