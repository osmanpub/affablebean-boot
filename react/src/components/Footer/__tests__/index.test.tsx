import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Footer from "..";

const footer = (
  <Router>
    <Footer />
  </Router>
);

describe("<Footer />", () => {
  it("renders correctly", () => {
    const component = renderer.create(footer).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show privacy", () => {
    const { getByTestId } = render(footer);
    const privacy = getByTestId(/footer-privacy/i);
    // @ts-ignore
    expect(privacy).toBeInTheDocument();
  });

  it("show contact", () => {
    const { getByTestId } = render(footer);
    const contact = getByTestId(/footer-contact/i);
    // @ts-ignore
    expect(contact).toBeInTheDocument();
  });
});
