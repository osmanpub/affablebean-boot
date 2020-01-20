import { container, mouseClick, setupAll } from "../../setupTests";

setupAll();

it("load contact us page", () => {
  // privacy and contact buttons
  const footerButtons = container.querySelectorAll("button.btn.btn-link");
  expect(footerButtons.length).toBe(2);

  // click on contact us
  // console.warn(footerButtons[1])
  mouseClick(footerButtons[1]);

  // const intro = container.querySelector("p");
  // expect(intro.textContent).toContain(
  //   "You can use this form for any comments or questions about our company or brands.For general enquiries please call toll free on 1-800-BEANS-R-US"
  // );
});
