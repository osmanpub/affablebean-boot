import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Category from "..";

const category = {
  id: 1,
  name: "dairy"
};

const categoryComponent = (
  <Router>
    <Category category={category} />
  </Router>
);

describe("<Category />", () => {
  it("renders correctly", () => {
    const component = renderer.create(categoryComponent).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("category present", () => {
    const { getByTestId } = render(categoryComponent);
    const box = getByTestId(/categoryBox/i);
    // @ts-ignore
    expect(box).toBeInTheDocument();
  });

  it("is dairy category", () => {
    const { getByAltText } = render(categoryComponent);
    const img = getByAltText(/dairy/i);
    // @ts-ignore
    expect(img).toBeInTheDocument();
  });
});
