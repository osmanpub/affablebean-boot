import {render} from '@testing-library/react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Category from '..';

const category = {
  id: 1,
  name: 'dairy',
};

const categoryComponent = (
  <Category category={category} setCategoryProduct={jest.fn()} />
);

describe('<Category />', () => {
  it('renders correctly', () => {
    const component = renderer.create(categoryComponent).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('show category', () => {
    const {getByTestId} = render(categoryComponent);
    const box = getByTestId(/categoryBox/i);
    expect(box).toBeTruthy();
  });

  it('is dairy category', () => {
    const {getByTestId} = render(categoryComponent);
    const img = getByTestId(/img-dairy/i);
    expect(img).toBeTruthy();
  });
});
