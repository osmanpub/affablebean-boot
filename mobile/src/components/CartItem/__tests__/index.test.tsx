import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import CartItem from '..';
import {fireEvent, render, wait} from '@testing-library/react-native';

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

const item = {
  product: {
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
  quantity: 1,
  total: 1.7,
};

const cartItem = (
  <Provider store={store}>
    <CartItem item={{...item}} />
  </Provider>
);

describe('<CartItem />', () => {
  it('renders correctly', () => {
    const component = renderer.create(cartItem).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show image', () => {
    const {getByTestId} = render(cartItem);
    const img = getByTestId(/image-milk/i);
    expect(img).toBeTruthy();
  });

  it('show name', () => {
    const {getByTestId} = render(cartItem);
    const name = getByTestId(/name-milk/i);
    expect(name).toBeTruthy();
  });
});
