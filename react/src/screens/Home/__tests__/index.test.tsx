import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "..";

const mockStore = configureStore([thunk]);

const initialState = {
  categories: {
    didInvalidate: false,
    isFetching: false,
    items: [
      {
        id: 1,
        name: "dairy"
      },
      {
        id: 2,
        name: "meats"
      },
      {
        id: 3,
        name: "bakery"
      },
      {
        id: 4,
        name: "fruit & veg"
      },
      {
        id: 5,
        name: "cereals"
      },
      {
        id: 6,
        name: "drinks"
      }
    ]
  }
};

const store = mockStore(initialState);

const home = (
  <Router>
    <Provider store={store}>
      <Home match={{ path: "/", url: "/", isExact: true, params: {} }} />
    </Provider>
  </Router>
);

describe("<Home />", () => {
  it("renders correctly", () => {
    const component = renderer.create(home).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show smaller navigatioal logo, on left", () => {
    const { getByAltText } = render(home);
    const logo = getByAltText(/Affable Bean logo/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show larger logo, on right", () => {
    const { getByAltText } = render(home);
    const logo = getByAltText(/the affable bean/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("don't show view cart link", () => {
    const { getByText } = render(home);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show proceed to checkout link", () => {
    const { getByText } = render(home);
    const link = getByText(/proceed to checkout/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show cart header total", () => {
    const { getByTestId } = render(home);
    const cart = getByTestId(/cart-hdr-total/i);
    // @ts-ignore
    expect(cart).not.toBeVisible();
  });

  it("show welcome paragraph", () => {
    const { getByTestId } = render(home);
    const welcome = getByTestId(/home-welcome/i);
    // @ts-ignore
    expect(welcome).toBeInTheDocument();
  });

  it("show six categories", () => {
    const { getAllByTestId } = render(home);
    const boxes = getAllByTestId(/categoryBox/i);
    // @ts-ignore
    expect(boxes).toHaveLength(6);
  });

  it("show privacy", () => {
    const { getByTestId } = render(home);
    const privacy = getByTestId(/footer-privacy/i);
    // @ts-ignore
    expect(privacy).toBeInTheDocument();
  });

  it("show contact", () => {
    const { getByTestId } = render(home);
    const contact = getByTestId(/footer-contact/i);
    // @ts-ignore
    expect(contact).toBeInTheDocument();
  });
});
