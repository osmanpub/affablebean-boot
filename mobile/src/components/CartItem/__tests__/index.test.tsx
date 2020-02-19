import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import CartItem from '..';

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

describe('<Categories />', () => {
  it('renders correctly', () => {
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

    const component = renderer
      .create(
        <Provider store={store}>
          <CartItem item={{...item}} />
        </Provider>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
