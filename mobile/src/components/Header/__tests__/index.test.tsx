import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Header from '..';

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

const header = (
  <Provider store={store}>
    <Header currentScreen="" setScreen={jest.fn()} />
  </Provider>
);

describe('<Header />', () => {
  it('renders correctly', () => {
    const component = renderer.create(header).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show logo', () => {
    const {getByTestId} = render(header);
    const logo = getByTestId(/logo/i);
    expect(logo).toBeTruthy();
  });

  it('show view cart link', () => {
    const {getByTestId} = render(header);
    const viewCart = getByTestId(/view-cart/i);
    expect(viewCart).toBeTruthy();
  });

  it('show clear cart link', () => {
    const {getByTestId} = render(header);
    const clearCart = getByTestId(/clear-cart/i);
    expect(clearCart).toBeTruthy();
  });

  it('show checkout link', () => {
    const {getByTestId} = render(header);
    const checkout = getByTestId(/checkout/i);
    expect(checkout).toBeTruthy();
  });

  it('show 1 cart items', () => {
    const {getByText} = render(header);
    const items = getByText(/1 items/i);
    expect(items).toBeTruthy();
  });
});
