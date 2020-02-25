import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CategoryProducts from '..';

const mockStore = configureStore([thunk]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [
      {
        product: {
          id: 1,
          description: 'semi skimmed (1L)',
          name: 'milk',
          price: 1.7,
        },
        quantity: 1,
        total: 1.7,
      },
    ],
    numberOfItems: 1,
    subtotal: 1.7,
  },
  category: {
    categories: {
      didInvalidate: false,
      isFetching: false,
      items: [
        {
          id: 1,
          name: 'dairy',
        },
        {
          id: 2,
          name: 'meats',
        },
        {
          id: 3,
          name: 'bakery',
        },
        {
          id: 4,
          name: 'fruit & veg',
        },
        {
          id: 5,
          name: 'cereals',
        },
        {
          id: 6,
          name: 'drinks',
        },
      ],
    },
    category: {
      id: 1,
      name: 'dairy',
    },
    didInvalidate: false,
    isFetching: false,
    products: [
      {
        id: 1,
        description: 'semi skimmed (1L)',
        name: 'milk',
        price: 1.7,
      },
      {
        id: 2,
        description: 'mild cheddar (330g)',
        name: 'cheese',
        price: 2.39,
      },
      {
        id: 3,
        description: 'unsalted (250g)',
        name: 'butter',
        price: 1.09,
      },
      {
        id: 4,
        description: 'medium-sized (6 eggs)',
        name: 'free range eggs',
        price: 1.76,
      },
    ],
  },
};

const store = mockStore(initialState);

const categoryProducts = (
  <Provider store={store}>
    <CategoryProducts id={1} setScreen={jest.fn()} />
  </Provider>
);

describe('<CategoryProducts />', () => {
  it('renders correctly', () => {
    const component = renderer.create(categoryProducts).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show logo', () => {
    const {getByTestId} = render(categoryProducts);
    const logo = getByTestId(/logo/i);
    expect(logo).toBeTruthy();
  });

  it('show clear cart link', () => {
    const {getByTestId} = render(categoryProducts);
    const clearCart = getByTestId(/clear-cart/i);
    expect(clearCart).toBeTruthy();
  });

  it('show view cart link', () => {
    const {getByTestId} = render(categoryProducts);
    const viewCart = getByTestId(/view-cart/i);
    expect(viewCart).toBeTruthy();
  });

  it('show checkout link', () => {
    const {getByTestId} = render(categoryProducts);
    const checkout = getByTestId(/checkout/i);
    expect(checkout).toBeTruthy();
  });

  it('show 1 cart items', () => {
    const {getByText} = render(categoryProducts);
    const items = getByText(/1 items/i);
    expect(items).toBeTruthy();
  });
});

describe('<Products />', () => {
  it('four products are shown', () => {
    const {getAllByTestId} = render(categoryProducts);
    const items = getAllByTestId(/product/i);
    expect(items).toHaveLength(4);
  });
});
