import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Category from "..";

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
});
