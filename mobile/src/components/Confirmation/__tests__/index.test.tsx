import {render} from '@testing-library/react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Confirmation from '..';

const order = {
  customer: {
    id: 1,
    address: '11111111',
    ccNumber: '1111111111111111',
    cityRegion: 'NY',
    email: 'joe@bloggs.com',
    name: 'joe bloggs',
    phone: '11111111',
  },
  orderedProducts: [
    {
      quantity: 1,
    },
  ],
  orderRecord: {
    id: 1,
    amount: 5.39,
    confirmationNumber: '995604757',
    dateCreated: '1582123900751',
  },
  products: [
    {
      id: 12,
      description: 'contain peanuts<br>(3 cookies)',
      name: 'chocolate cookies',
      price: 2.39,
      category: {id: 3, name: 'bakery'},
    },
  ],
};

const confirmation = <Confirmation order={order} />;

describe('<Confirmation />', () => {
  it('renders correctly', () => {
    const component = renderer.create(confirmation).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show success paragraph', () => {
    const {getByTestId} = render(confirmation);
    const success = getByTestId(/confirm-success/i);
    expect(success).toBeTruthy();
  });

  it('show confirmation number', () => {
    const {getByTestId} = render(confirmation);
    const total = getByTestId(/confirm-number/i);
    expect(total).toBeTruthy();
    expect(total.children).toContain('995604757');
  });
});
