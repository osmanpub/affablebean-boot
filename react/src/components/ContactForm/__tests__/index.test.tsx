import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import ContactForm from "..";

const mockStore = configureStore([]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0
  },
  subjects: {
    didInvalidate: false,
    isFetching: false,
    items: [
      {
        id: 1,
        name: "Brands or product"
      },
      {
        id: 2,
        name: "Investor relations"
      },
      {
        id: 3,
        name: "Sustainability"
      },
      {
        id: 4,
        name: "The Company"
      },
      {
        id: 5,
        name: "Media enquiry"
      },
      {
        id: 6,
        name: "Website feedback"
      },
      {
        id: 7,
        name: "Other"
      }
    ]
  },
  ui: {
    formErrors: []
  }
};

const store = mockStore(initialState);

const contactForm = (
  <Router>
    <Provider store={store}>
      <ContactForm />
    </Provider>
  </Router>
);

describe("<ContactForm />", () => {
  it("renders correctly", () => {
    const component = renderer.create(contactForm).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show contact intro", () => {
    const { getByTestId } = render(contactForm);
    const intro = getByTestId(/contact-intro/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show checkout form", () => {
    const { getByRole } = render(contactForm);
    const form = getByRole(/form/i);
    // @ts-ignore
    expect(form).toBeInTheDocument();
  });

  it("show select box", () => {
    const { getByRole } = render(contactForm);
    const input = getByRole(/listbox/i);
    // @ts-ignore
    expect(input).toBeInTheDocument();
  });

  it("show 3 input fields", () => {
    const { getAllByRole } = render(contactForm);
    const inputs = getAllByRole(/textbox/i);
    // @ts-ignore
    expect(inputs).toHaveLength(3);
  });

  it("show submit button", () => {
    const { getByRole } = render(contactForm);
    const button = getByRole(/button/i);
    // @ts-ignore
    expect(button).toBeInTheDocument();
  });

  it("set name input to 'osman'", () => {
    const { getByTestId } = render(contactForm);
    const input = getByTestId(/contact-name/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman");
  });

  it("set email input to 'osman@gmail.com'", () => {
    const { getByTestId } = render(contactForm);
    const input = getByTestId(/contact-email/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman@gmail.com" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman@gmail.com");
  });

  it("set message input to 'hello there!'", () => {
    const { getByTestId } = render(contactForm);
    const input = getByTestId(/contact-msg/i);

    act(() => {
      fireEvent.change(input, { target: { value: "hello there!" } });
    });

    // @ts-ignore
    expect(input.value).toBe("hello there!");
  });
});
