import {act, fireEvent, render} from '@testing-library/react-native';
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

const checkout = (
  <Provider store={store}>
    <Checkout setScreen={jest.fn()} />
  </Provider>
);

describe('<Checkout />', () => {
  it('renders correctly', () => {
    const component = renderer.create(checkout).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show logo', () => {
    const {getByTestId} = render(checkout);
    const logo = getByTestId(/logo/i);
    expect(logo).toBeTruthy();
  });

  it('show view cart link', () => {
    const {getByTestId} = render(checkout);
    const viewCart = getByTestId(/view-cart/i);
    expect(viewCart).toBeTruthy();
  });

  it('show clear cart link', () => {
    const {getByTestId} = render(checkout);
    const clearCart = getByTestId(/clear-cart/i);
    expect(clearCart).toBeTruthy();
  });

  it('show 1 cart items', () => {
    const {getByText} = render(checkout);
    const items = getByText(/1 items/i);
    expect(items).toBeTruthy();
  });
});

describe('<Data Entry />', () => {
  it('renders correctly', () => {
    const component = renderer.create(checkout).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show intro', () => {
    const {getByTestId} = render(checkout);
    const intro = getByTestId(/checkout-intro/i);
    expect(intro).toBeTruthy();
  });

  it('show 5 input fields', () => {
    const {getAllByTestId} = render(checkout);
    const inputs = getAllByTestId('checkout-input');
    expect(inputs).toHaveLength(5);
  });

  it('show submit button', () => {
    const {getByTestId} = render(checkout);
    const button = getByTestId(/checkout-submit/i);
    expect(button).toBeTruthy();
  });

  it("set name to 'osman'", () => {
    const {getByPlaceholderText} = render(checkout);
    const input = getByPlaceholderText('Enter your name');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: 'osman'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('osman');
  });

  it("set phone to '1234567890'", () => {
    const {getByPlaceholderText} = render(checkout);
    const input = getByPlaceholderText('Enter your phone number');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: '1234567890'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('1234567890');
  });

  it("set email to 'osman@gmail.com'", () => {
    const {getByPlaceholderText} = render(checkout);
    const input = getByPlaceholderText('Enter your email address');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: 'osman@gmail.com'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('osman@gmail.com');
  });

  it("set address to 'nobody cares where you live'", () => {
    const {getByPlaceholderText} = render(checkout);
    const input = getByPlaceholderText('Enter your address');

    act(() => {
      fireEvent.change(input, {
        nativeEvent: {text: 'nobody cares where you live'},
      });
    });

    // @ts-ignore
    expect(input.props.value).toBe('nobody cares where you live');
  });

  it("set cc to '1234567890123456'", () => {
    const {getByPlaceholderText} = render(checkout);
    const input = getByPlaceholderText('Enter your credit card number');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: '1234567890123456'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('1234567890123456');
  });
});
