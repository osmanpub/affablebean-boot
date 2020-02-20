import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CategoryProducts from '..';

const mockStore = configureStore([thunk]);

const initialState = {
  cart: {
    isFetching: false,
  },
  category: {
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
    category: {
      id: 1,
      name: 'dairy',
    },
    didInvalidate: false,
    isFetching: false,
    products: [
      {
        id: 1,
        description: 'semi skimmed (1L)',
        name: 'milk',
        price: 1.7,
      },
      {
        id: 2,
        description: 'mild cheddar (330g)',
        name: 'cheese',
        price: 2.39,
      },
      {
        id: 3,
        description: 'unsalted (250g)',
        name: 'butter',
        price: 1.09,
      },
      {
        id: 4,
        description: 'medium-sized (6 eggs)',
        name: 'free range eggs',
        price: 1.76,
      },
    ],
  },
};

const store = mockStore(initialState);

describe('<CategoryProducts />', () => {
  it('renders correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <CategoryProducts id={1} setScreen={jest.fn()} />
        </Provider>,
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
