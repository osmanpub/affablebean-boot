import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
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

  it('show price', () => {
    const {getByTestId} = render(cartItem);
    const price = getByTestId(/price-milk/i);
    expect(price).toBeTruthy();
  });

  it('show quantity', () => {
    const {getByDisplayValue} = render(cartItem);
    const input = getByDisplayValue('1');
    expect(input).toBeTruthy();
  });

  it('update quantity to 0', () => {
    const {getByDisplayValue} = render(cartItem);
    const input = getByDisplayValue('1');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: '0'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('0'); // this would remove the item on update event
  });

  it('update quantity to 2', () => {
    const {getByDisplayValue} = render(cartItem);
    const input = getByDisplayValue('1');

    act(() => {
      fireEvent.change(input, {nativeEvent: {text: '2'}});
    });

    // @ts-ignore
    expect(input.props.value).toBe('2');
  });

  it('show update button', () => {
    const {getByTestId} = render(cartItem);
    const updateButton = getByTestId(/submit-milk/i);
    expect(updateButton).toBeTruthy();
  });
});
