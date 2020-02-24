import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Categories from '..';

const mockStore = configureStore([]);

const initialState = {
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
};

const store = mockStore(initialState);

const categories = (
  <Provider store={store}>
    <Categories setCategoryProduct={jest.fn()} />
  </Provider>
);

describe('<Categories />', () => {
  it('renders correctly', () => {
    const component = renderer.create(categories).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show six categories', () => {
    const {getAllByTestId} = render(categories);
    const boxes = getAllByTestId(/categoryBox/i);
    expect(boxes).toHaveLength(6);
  });
});
