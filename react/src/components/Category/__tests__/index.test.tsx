import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Category from "..";
import { shallow } from "enzyme";

describe("<Category />", () => {
  const category = {
    id: 1,
    name: "dairy"
  };

  it("renders correctly", () => {
    const component = renderer
      .create(
        <Router>
          <Category category={category} />
        </Router>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shallow testing", () => {
    const component = shallow(<Category category={category} />);
    // console.warn(component.props)
    // expect(component.find(".categoryImage")).to.have.lengthOf(1);
  });
});
