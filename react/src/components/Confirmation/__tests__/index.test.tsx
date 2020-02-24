import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Confirmation from "..";

const order = {
  customer: {
    id: 1,
    address: "none of your business",
    ccNumber: "1234567890123456",
    cityRegion: "NY",
    email: "joe@bloggs.com",
    name: "joe bloggs",
    phone: "1234567890"
  },
  orderedProducts: [
    {
      quantity: 1
    }
  ],
  orderRecord: {
    id: 1,
    amount: 5.39,
    confirmationNumber: "995604757",
    dateCreated: "1582123900751"
  },
  products: [
    {
      id: 12,
      description: "contain peanuts<br>(3 cookies)",
      name: "chocolate cookies",
      price: 2.39,
      category: { id: 3, name: "bakery" }
    }
  ]
};

const confirmation = (
  <Router>
    <Confirmation order={order} />
  </Router>
);

describe("<Confirmation />", () => {
  it("renders correctly", () => {
    const component = renderer.create(confirmation).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show success paragraph", () => {
    const { getByTestId } = render(confirmation);
    const success = getByTestId(/confirm-success/i);
    // @ts-ignore
    expect(success).toBeInTheDocument();
  });

  it("surcharge is 3.00", () => {
    const { getByTestId } = render(confirmation);
    const total = getByTestId(/surcharge/i);
    // @ts-ignore
    expect(total).toHaveTextContent(/3.00/i);
  });

  it("total is 5.39", () => {
    const { getByTestId } = render(confirmation);
    const surcharge = getByTestId(/total/i);
    // @ts-ignore
    expect(surcharge).toHaveTextContent(/5.39/i);
  });

  it("customer name is 'joe bloggs'", () => {
    const { getByTestId } = render(confirmation);
    const name = getByTestId(/name/i);
    // @ts-ignore
    expect(name).toHaveTextContent(/joe bloggs/i);
  });

  it("customer address is 'none of your business'", () => {
    const { getByTestId } = render(confirmation);
    const address = getByTestId(/address/i);
    // @ts-ignore
    expect(address).toHaveTextContent(/none of your business/i);
  });

  it("customer phone is '1234567890'", () => {
    const { getByTestId } = render(confirmation);
    const phone = getByTestId(/phone/i);
    // @ts-ignore
    expect(phone).toHaveTextContent(/1234567890/i);
  });

  it("customer email is 'joe@bloggs.com'", () => {
    const { getByTestId } = render(confirmation);
    const email = getByTestId(/email/i);
    // @ts-ignore
    expect(email).toHaveTextContent(/joe@bloggs.com/i);
  });

  it("customer cityRegion is 'joe bloggs'", () => {
    const { getByTestId } = render(confirmation);
    const region = getByTestId(/cityRegion/i);
    // @ts-ignore
    expect(region).toHaveTextContent(/NY/);
  });
});
