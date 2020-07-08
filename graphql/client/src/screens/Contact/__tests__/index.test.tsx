import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Contact from "..";

const mockStore = configureStore([thunk]);

const initialState = {
  cart: {
    didInvalidate: false,
    isFetching: false,
    items: [],
    numberOfItems: 0,
    subtotal: 0,
  },
  subjects: {
    didInvalidate: false,
    isFetching: false,
    items: [
      {
        id: 1,
        name: "Brands or product",
      },
      {
        id: 2,
        name: "Investor relations",
      },
      {
        id: 3,
        name: "Sustainability",
      },
      {
        id: 4,
        name: "The Company",
      },
      {
        id: 5,
        name: "Media enquiry",
      },
      {
        id: 6,
        name: "Website feedback",
      },
      {
        id: 7,
        name: "Other",
      },
    ],
  },
  ui: {
    formErrors: [],
  },
};

const store = mockStore(initialState);

const contact = (
  <Router>
    <Provider store={store}>
      <Contact
        match={{
          path: "/contact",
          url: "/contact",
          isExact: true,
          params: {},
        }}
      />
    </Provider>
  </Router>
);

describe("<Contact />", () => {
  it("renders correctly", () => {
    const component = renderer.create(contact).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show smaller navigatioal logo, on left", () => {
    const { getByAltText } = render(contact);
    const logo = getByAltText(/Affable Bean logo/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("show larger logo, on right", () => {
    const { getByAltText } = render(contact);
    const logo = getByAltText(/the affable bean/i);
    // @ts-ignore
    expect(logo).toBeInTheDocument();
  });

  it("don't show view cart link", () => {
    const { getByText } = render(contact);
    const link = getByText(/view cart/i);
    // @ts-ignore
    expect(link).not.toBeVisible();
  });

  it("don't show cart header total", () => {
    const { getByTestId } = render(contact);
    const cart = getByTestId(/cart-hdr-total/i);
    // @ts-ignore
    expect(cart).not.toBeVisible();
  });

  it("show intro", () => {
    const { getByTestId } = render(contact);
    const intro = getByTestId(/contact-intro/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show contact", () => {
    const { getByTestId } = render(contact);
    const intro = getByTestId(/footer-contact/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show privacy", () => {
    const { getByTestId } = render(contact);
    const privacy = getByTestId(/footer-privacy/i);
    // @ts-ignore
    expect(privacy).toBeInTheDocument();
  });
});

describe("<Data Entry />", () => {
  it("renders correctly", () => {
    const component = renderer.create(contact).toJSON();
    // @ts-ignore
    expect(component).toMatchSnapshot();
  });

  it("show intro", () => {
    const { getByTestId } = render(contact);
    const intro = getByTestId(/contact-intro/i);
    // @ts-ignore
    expect(intro).toBeInTheDocument();
  });

  it("show form", () => {
    const { getByRole } = render(contact);
    const form = getByRole(/form/i);
    // @ts-ignore
    expect(form).toBeInTheDocument();
  });

  it("show select box", () => {
    const { getByRole } = render(contact);
    const input = getByRole(/listbox/i);
    // @ts-ignore
    expect(input).toBeInTheDocument();
  });

  it("show 3 input fields", () => {
    const { getAllByRole } = render(contact);
    const inputs = getAllByRole(/textbox/i);
    // @ts-ignore
    expect(inputs).toHaveLength(3);
  });

  it("set name to 'osman'", () => {
    const { getByTestId } = render(contact);
    const input = getByTestId(/contact-name/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman");
  });

  it("set email to 'osman@gmail.com'", () => {
    const { getByTestId } = render(contact);
    const input = getByTestId(/contact-email/i);

    act(() => {
      fireEvent.change(input, { target: { value: "osman@gmail.com" } });
    });

    // @ts-ignore
    expect(input.value).toBe("osman@gmail.com");
  });

  it("set message to 'hello there!'", () => {
    const { getByTestId } = render(contact);
    const input = getByTestId(/contact-msg/i);

    act(() => {
      fireEvent.change(input, { target: { value: "hello there!" } });
    });

    // @ts-ignore
    expect(input.value).toBe("hello there!");
  });
});
