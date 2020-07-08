import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Header from "..";

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

const header = (
  <Router>
    <Provider store={store}>
      <Header url="/" />
    </Provider>
    )
  </Router>
);

describe("<Header />", () => {
  it("renders correctly", () => {
    const component = renderer.create(header).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show smaller navigatioal logo, on left", () => {
    const { getByAltText } = render(header);
    const logo = getByAltText(/Affable Bean logo/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show larger logo, on right", () => {
    const { getByAltText } = render(header);
    const logo = getByAltText(/the affable bean/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });
});
