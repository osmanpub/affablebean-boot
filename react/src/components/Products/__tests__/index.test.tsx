import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Products from "..";

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

const category = {
  categories: [
    {
      id: 3,
      name: "bakery",
      _links: {
        self: { href: "http://localhost:8080/api/categories/3" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 5,
      name: "cereals",
      _links: {
        self: { href: "http://localhost:8080/api/categories/5" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 1,
      name: "dairy",
      _links: {
        self: { href: "http://localhost:8080/api/categories/1" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 6,
      name: "drinks",
      _links: {
        self: { href: "http://localhost:8080/api/categories/6" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 4,
      name: "fruit & veg",
      _links: {
        self: { href: "http://localhost:8080/api/categories/4" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    },
    {
      id: 2,
      name: "meats",
      _links: {
        self: { href: "http://localhost:8080/api/categories/2" },
        categories: { href: "http://localhost:8080/api/categories" }
      }
    }
  ],
  category: {
    id: 1,
    name: "dairy",
    _links: {
      self: { href: "http://localhost:8080/api/categories/1" },
      categories: { href: "http://localhost:8080/api/categories" }
    }
  },
  products: [
    // node
    {
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
    {
      id: 2,
      description: "mild cheddar (330g)",
      name: "cheese",
      price: 2.39,
      category: { id: 1, name: "dairy" },
      _links: {
        self: { href: "http://localhost:8080/api/products/2" },
        products: { href: "http://localhost:8080/api/products" }
      }
    },
    {
      id: 3,
      description: "unsalted (250g)",
      name: "butter",
      price: 1.09,
      category: { id: 1, name: "dairy" },
      _links: {
        self: { href: "http://localhost:8080/api/products/3" },
        products: { href: "http://localhost:8080/api/products" }
      }
    },
    {
      id: 4,
      description: "medium-sized (6 eggs)",
      name: "free range eggs",
      price: 1.76,
      category: { id: 1, name: "dairy" },
      _links: {
        self: { href: "http://localhost:8080/api/products/4" },
        products: { href: "http://localhost:8080/api/products" }
      }
    }
  ]
  // products: { // java
  //   _embedded: {
  //     productList: [
  //       {
  //         id: 1,
  //         description: "semi skimmed (1L)",
  //         name: "milk",
  //         price: 1.7,
  //         category: { id: 1, name: "dairy" },
  //         _links: {
  //           self: { href: "http://localhost:8080/api/products/1" },
  //           products: { href: "http://localhost:8080/api/products" }
  //         }
  //       },
  //       {
  //         id: 2,
  //         description: "mild cheddar (330g)",
  //         name: "cheese",
  //         price: 2.39,
  //         category: { id: 1, name: "dairy" },
  //         _links: {
  //           self: { href: "http://localhost:8080/api/products/2" },
  //           products: { href: "http://localhost:8080/api/products" }
  //         }
  //       },
  //       {
  //         id: 3,
  //         description: "unsalted (250g)",
  //         name: "butter",
  //         price: 1.09,
  //         category: { id: 1, name: "dairy" },
  //         _links: {
  //           self: { href: "http://localhost:8080/api/products/3" },
  //           products: { href: "http://localhost:8080/api/products" }
  //         }
  //       },
  //       {
  //         id: 4,
  //         description: "medium-sized (6 eggs)",
  //         name: "free range eggs",
  //         price: 1.76,
  //         category: { id: 1, name: "dairy" },
  //         _links: {
  //           self: { href: "http://localhost:8080/api/products/4" },
  //           products: { href: "http://localhost:8080/api/products" }
  //         }
  //       }
  //     ]
  //   },
  //   _links: {
  //     categoryProducts: { href: "http://localhost:8080/api/products" }
  //   }
  // }
};

const products = (
  <Router>
    <Provider store={store}>
      <Products {...category} />
    </Provider>
  </Router>
);

describe("<Products />", () => {
  it("renders correctly", () => {
    const component = renderer.create(products).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("selected category is dairy", () => {
    const { getByTestId } = render(products);
    const selected = getByTestId(/selected-dairy/i);
    // @ts-ignore
    expect(selected).toHaveTextContent("dairy");
  });

  it("four products are shown", () => {
    const { getAllByTestId } = render(products);
    const items = getAllByTestId(/product/i);
    // @ts-ignore
    expect(items).toHaveLength(4);
  });

  it("show submit buttons", () => {
    const { getAllByRole } = render(products);
    const buttons = getAllByRole(/button/i);
    // @ts-ignore
    expect(buttons).toHaveLength(4);
  });

  it("first product is 'milk'", () => {
    const { getByAltText, getByTestId, getAllByTestId } = render(products);
    const items = getAllByTestId(/product/i);
    const milk = items[0];
    // @ts-ignore
    expect(milk).toHaveTextContent("milk");
    // @ts-ignore
    expect(milk).toHaveTextContent("1.7");
    // @ts-ignore
    expect(milk).toHaveTextContent("semi skimmed (1L)");

    const img = getByAltText(/milk/i);
    // @ts-ignore
    expect(img).toBeInTheDocument();

    const price = getByTestId(/price-milk/i);
    // @ts-ignore
    expect(price).toHaveTextContent("1.7");
  });
});
