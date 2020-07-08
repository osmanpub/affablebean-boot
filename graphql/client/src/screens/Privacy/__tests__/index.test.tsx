import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Privacy from "..";

const mockStore = configureStore([]);

const initialState = {};

const store = mockStore(initialState);

const privacy = (
  <Router>
    <Provider store={store}>
      <Privacy
        match={{
          path: "/privacy",
          url: "/privacy",
          isExact: true,
          params: {},
        }}
      />
    </Provider>
  </Router>
);

describe("<Privacy />", () => {
  it("renders correctly", () => {
    const component = renderer.create(privacy).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show smaller navigatioal logo, on left", () => {
    const { getByAltText } = render(privacy);
    const logo = getByAltText(/Affable Bean logo/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show larger logo, on right", () => {
    const { getByAltText } = render(privacy);
    const logo = getByAltText(/the affable bean/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("don't show view cart link", () => {
    const { getByText } = render(privacy);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show proceed to checkout link", () => {
    const { getByText } = render(privacy);
    const link = getByText(/proceed to checkout/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show cart header total", () => {
    const { getByTestId } = render(privacy);
    const cart = getByTestId(/cart-hdr-total/i);
    // @ts-ignore
    expect(cart).not.toBeVisible();
  });

  it("show intro", () => {
    const { getByTestId } = render(privacy);
    const intro = getByTestId(/privacy-intro/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show privacy", () => {
    const { getByTestId } = render(privacy);
    const intro = getByTestId(/footer-privacy/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show contact", () => {
    const { getByTestId } = render(privacy);
    const contact = getByTestId(/footer-contact/i);
    // @ts-ignore
    expect(contact).toBeInTheDocument();
  });
});
