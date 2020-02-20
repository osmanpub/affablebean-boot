import {
  changeValue,
  container,
  mouseClick,
  setupAll
} from "../../../setupTests";

setupAll(() => {
  // privacy and contact buttons
  const footerButtons = container.querySelectorAll("button.btn.btn-link");
  expect(footerButtons.length).toBe(2);

  // click on contact us
  mouseClick(footerButtons[1]);
});

it("load contact us page", () => {
  const intro = container.querySelector("p");
  expect(intro.textContent).toContain(
    "You can use this form for any comments or questions about our company or brands.For general enquiries please call toll free on 1-800-BEANS-R-US"
  );
});

it("fill in and send form", () => {
  const inputs = container.querySelectorAll("input");

  // fill in form
  changeValue(inputs[0], "Joe Sixpack Jr");
  changeValue(inputs[1], "joe@gmail.com");

  const msg = container.querySelector("textarea");
  changeValue(msg, "this is a test message");

  mouseClick(container.querySelector("button.btn-primary")); // send
});
