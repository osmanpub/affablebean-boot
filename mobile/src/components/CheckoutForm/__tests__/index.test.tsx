import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import CheckoutForm from '..';

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

const checkoutForm = (
  <Provider store={store}>
    <CheckoutForm />
  </Provider>
);

describe('<CheckoutForm />', () => {
  it('renders correctly', () => {
    const component = renderer.create(checkoutForm).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show intro', () => {
    const {getByTestId} = render(checkoutForm);
    const intro = getByTestId(/checkout-intro/i);
    expect(intro).toBeTruthy();
  });

  it('show 5 input fields', () => {
    const {getAllByTestId} = render(checkoutForm);
    const inputs = getAllByTestId('checkout-input');
    expect(inputs).toHaveLength(5);
  });

  it('show submit button', () => {
    const {getByTestId} = render(checkoutForm);
    const button = getByTestId(/checkout-submit/i);
    expect(button).toBeTruthy();
  });

  it("set name to 'osman'", () => {
    const {getByPlaceholderText} = render(checkoutForm);
    const input = getByPlaceholderText('Enter your name');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: 'osman'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('osman');
  });

  it("set phone to '1234567890'", () => {
    const {getByPlaceholderText} = render(checkoutForm);
    const input = getByPlaceholderText('Enter your phone number');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: '1234567890'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('1234567890');
  });

  it("set email to 'osman@gmail.com'", () => {
    const {getByPlaceholderText} = render(checkoutForm);
    const input = getByPlaceholderText('Enter your email address');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: 'osman@gmail.com'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('osman@gmail.com');
  });

  it("set address to 'nobody cares where you live'", () => {
    const {getByPlaceholderText} = render(checkoutForm);
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
    const {getByPlaceholderText} = render(checkoutForm);
    const input = getByPlaceholderText('Enter your credit card number');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: '1234567890123456'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('1234567890123456');
  });
});
