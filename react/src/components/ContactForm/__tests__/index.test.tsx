import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import ContactForm from "..";

const mockStore = configureStore([]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0
  },
  subjects: {
    didInvalidate: false,
    isFetching: false,
    items: [
      {
        id: 1,
        name: "Brands or product"
      },
      {
        id: 2,
        name: "Investor relations"
      },
      {
        id: 3,
        name: "Sustainability"
      },
      {
        id: 4,
        name: "The Company"
      },
      {
        id: 5,
        name: "Media enquiry"
      },
      {
        id: 6,
        name: "Website feedback"
      },
      {
        id: 7,
        name: "Other"
      }
    ]
  },
  ui: {
    formErrors: []
  }
};

const store = mockStore(initialState);

describe("<ContactForm />", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(
        <Router>
          <Provider store={store}>
            <ContactForm />
          </Provider>
        </Router>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
