import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Cart from '..';

const mockStore = configureStore([]);

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
};

const store = mockStore(initialState);

describe('<Cart />', () => {
  it('renders correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <Cart setScreen={jest.fn()} />
        </Provider>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
