import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Products from '..';

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

const category = {
  categories: [
    {
      id: 3,
      name: 'bakery',
      _links: {
        self: {href: 'http://localhost:8080/api/categories/3'},
        categories: {href: 'http://localhost:8080/api/categories'},
      },
    },
    {
      id: 5,
      name: 'cereals',
      _links: {
        self: {href: 'http://localhost:8080/api/categories/5'},
        categories: {href: 'http://localhost:8080/api/categories'},
      },
    },
    {
      id: 1,
      name: 'dairy',
      _links: {
        self: {href: 'http://localhost:8080/api/categories/1'},
        categories: {href: 'http://localhost:8080/api/categories'},
      },
    },
    {
      id: 6,
      name: 'drinks',
      _links: {
        self: {href: 'http://localhost:8080/api/categories/6'},
        categories: {href: 'http://localhost:8080/api/categories'},
      },
    },
    {
      id: 4,
      name: 'fruit & veg',
      _links: {
        self: {href: 'http://localhost:8080/api/categories/4'},
        categories: {href: 'http://localhost:8080/api/categories'},
      },
    },
    {
      id: 2,
      name: 'meats',
      _links: {
        self: {href: 'http://localhost:8080/api/categories/2'},
        categories: {href: 'http://localhost:8080/api/categories'},
      },
    },
  ],
  category: {
    id: 1,
    name: 'dairy',
    _links: {
      self: {href: 'http://localhost:8080/api/categories/1'},
      categories: {href: 'http://localhost:8080/api/categories'},
    },
  },
  products: [
    // node
    {
      id: 1,
      description: 'semi skimmed (1L)',
      name: 'milk',
      price: 1.7,
      category: {id: 1, name: 'dairy'},
      _links: {
        self: {href: 'http://localhost:8080/api/products/1'},
        products: {href: 'http://localhost:8080/api/products'},
      },
    },
    {
      id: 2,
      description: 'mild cheddar (330g)',
      name: 'cheese',
      price: 2.39,
      category: {id: 1, name: 'dairy'},
      _links: {
        self: {href: 'http://localhost:8080/api/products/2'},
        products: {href: 'http://localhost:8080/api/products'},
      },
    },
    {
      id: 3,
      description: 'unsalted (250g)',
      name: 'butter',
      price: 1.09,
      category: {id: 1, name: 'dairy'},
      _links: {
        self: {href: 'http://localhost:8080/api/products/3'},
        products: {href: 'http://localhost:8080/api/products'},
      },
    },
    {
      id: 4,
      description: 'medium-sized (6 eggs)',
      name: 'free range eggs',
      price: 1.76,
      category: {id: 1, name: 'dairy'},
      _links: {
        self: {href: 'http://localhost:8080/api/products/4'},
        products: {href: 'http://localhost:8080/api/products'},
      },
    },
  ],
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

describe('<Products />', () => {
  it('renders correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <Products {...category} />
        </Provider>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
