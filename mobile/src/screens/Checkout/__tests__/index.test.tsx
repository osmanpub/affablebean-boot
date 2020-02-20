import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Checkout from '..';

const mockStore = configureStore([]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0,
  },
  purchase: {
    didInvalidate: false,
    isPosting: false,
    order: {},
  },
  ui: {
    formErrors: [],
  },
};

const store = mockStore(initialState);

describe('<Checkout />', () => {
  it('renders correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <Checkout setScreen={jest.fn()} />
        </Provider>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
