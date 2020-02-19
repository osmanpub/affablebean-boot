import {shallow} from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Category from '..';

describe('<Category />', () => {
  const category = {
    id: 1,
    name: 'dairy',
  };

  it('renders correctly', () => {
    const component = renderer
      .create(<Category category={category} setCategoryProduct={jest.fn()} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render my component', () => {
    const component = shallow(
      <Category category={category} setCategoryProduct={jest.fn()} />,
    );
    console.warn(component);
  });
});
