import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '..';

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
};

const store = mockStore(initialState);

const home = (
  <Provider store={store}>
    <Home setCategoryProduct={jest.fn()} setScreen={jest.fn()} />
  </Provider>
);

describe('<Home />', () => {
  it('renders correctly', () => {
    const component = renderer.create(home).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show logo', () => {
    const {getByTestId} = render(home);
    const logo = getByTestId(/logo/i);
    expect(logo).toBeTruthy();
  });

  it('show view cart link', () => {
    const {getByTestId} = render(home);
    const viewCart = getByTestId(/view-cart/i);
    expect(viewCart).toBeTruthy();
  });

  it('show clear cart link', () => {
    const {getByTestId} = render(home);
    const clearCart = getByTestId(/clear-cart/i);
    expect(clearCart).toBeTruthy();
  });

  it('show checkout link', () => {
    const {getByTestId} = render(home);
    const checkout = getByTestId(/checkout/i);
    expect(checkout).toBeTruthy();
  });

  it('show 1 cart items', () => {
    const {getByText} = render(home);
    const items = getByText(/1 items/i);
    expect(items).toBeTruthy();
  });

  it('show six categories', () => {
    const {getAllByTestId} = render(home);
    const boxes = getAllByTestId(/categoryBox/i);
    expect(boxes).toHaveLength(6);
  });
});
