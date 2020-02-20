import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Categories from "..";
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore([]);

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

describe("<Categories />", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(
        <Router>
          <Provider store={store}>
            <Categories />
          </Provider>
        </Router>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
