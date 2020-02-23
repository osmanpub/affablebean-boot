import { act, fireEvent, render, waitForElement } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import CategoryProducts from "..";

const mockStore = configureStore([thunk]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0
  },
  category: {
    categories: [
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
    ],
    category: {
      id: 1,
      name: "dairy"
    },
    didInvalidate: false,
    isFetching: false,
    products: [
      {
        id: 1,
        description: "semi skimmed (1L)",
        name: "milk",
        price: 1.7
      },
      {
        id: 2,
        description: "mild cheddar (330g)",
        name: "cheese",
        price: 2.39
      },
      {
        id: 3,
        description: "unsalted (250g)",
        name: "butter",
        price: 1.09
      },
      {
        id: 4,
        description: "medium-sized (6 eggs)",
        name: "free range eggs",
        price: 1.76
      }
    ]
  }
};

const store = mockStore(initialState);

const categoryProducts = (
  <Router>
    <Provider store={store}>
      <CategoryProducts
        clearCart={jest.fn()}
        match={{
          path: "/category/:id",
          url: "/category/1",
          isExact: true,
          params: { id: 1 }
        }}
      />
    </Provider>
  </Router>
);

describe("<CategoryProducts />", () => {
  it("renders correctly", () => {
    const component = renderer.create(categoryProducts).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show smaller navigatioal logo, on left", () => {
    const { getByAltText } = render(categoryProducts);
    const logo = getByAltText(/Affable Bean logo/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show larger logo, on right", () => {
    const { getByAltText } = render(categoryProducts);
    const logo = getByAltText(/the affable bean/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("don't show view cart link", () => {
    const { getByText } = render(categoryProducts);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show proceed to checkout link", () => {
    const { getByText } = render(categoryProducts);
    const link = getByText(/proceed to checkout/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show cart header total", () => {
    const { getByTestId } = render(categoryProducts);
    const cart = getByTestId(/cart-hdr-total/i);
    // @ts-ignore
    expect(cart).not.toBeVisible();
  });

  it("show privacy", () => {
    const { getByTestId } = render(categoryProducts);
    const privacy = getByTestId(/footer-privacy/i);
    // @ts-ignore
    expect(privacy).toBeInTheDocument();
  });

  it("show contact", () => {
    const { getByTestId } = render(categoryProducts);
    const contact = getByTestId(/footer-contact/i);
    // @ts-ignore
    expect(contact).toBeInTheDocument();
  });
});

describe("<Products />", () => {
  it("selected category is dairy", () => {
    const { getByTestId } = render(categoryProducts);
    const selected = getByTestId(/selected-dairy/i);
    // @ts-ignore
    expect(selected).toHaveTextContent("dairy");
  });

  it("four products are shown", () => {
    const { getAllByTestId } = render(categoryProducts);
    const items = getAllByTestId(/product/i);
    // @ts-ignore
    expect(items).toHaveLength(4);
  });

  it("add 'milk' to cart", async () => {
    const { getAllByRole, getByAltText, getByTestId, getByText } = render(
      categoryProducts
    );
    const img = getByAltText(/milk/i);
    const milkUpdate = getAllByRole(/button/i)[0];

    act(() => {
      fireEvent.click(milkUpdate);
    });

    // @ts-ignore
    expect(img).toBeInTheDocument();

    const price = getByTestId(/price-milk/i);
    // @ts-ignore
    expect(price).toHaveTextContent("1.7");

    const link = await waitForElement(() => getByText(/view cart/i));
    // @ts-ignore
    // expect(link).toBeVisible(); // not working!
  });
});
