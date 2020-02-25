import {act, fireEvent, render} from '@testing-library/react-native';
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

const cart = (
  <Provider store={store}>
    <Cart setScreen={jest.fn()} />
  </Provider>
);

describe('<Cart />', () => {
  it('renders correctly', () => {
    const component = renderer.create(cart).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show logo', () => {
    const {getByTestId} = render(cart);
    const logo = getByTestId(/logo/i);
    expect(logo).toBeTruthy();
  });

  it('show clear cart link', () => {
    const {getByTestId} = render(cart);
    const clearCart = getByTestId(/clear-cart/i);
    expect(clearCart).toBeTruthy();
  });

  it('show checkout link', () => {
    const {getByTestId} = render(cart);
    const checkout = getByTestId(/checkout/i);
    expect(checkout).toBeTruthy();
  });

  it('show 1 cart items', () => {
    const {getByText} = render(cart);
    const items = getByText(/1 items/i);
    expect(items).toBeTruthy();
  });
});

describe('<CartItem />', () => {
  it('update quantity to 2', () => {
    const {getByPlaceholderText} = render(cart);
    const input = getByPlaceholderText('Enter quantity');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: '2'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('2');
  });
});
