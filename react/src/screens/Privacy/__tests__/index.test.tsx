import { container, mouseClick, setupAll } from "../../../setupTests";

setupAll(() => {
  // privacy and contact buttons
  const footerButtons = container.querySelectorAll("button.btn.btn-link");
  expect(footerButtons.length).toBe(2);

  // click on privacy
  mouseClick(footerButtons[0]);
});

it("load privacy page", () => {
  const intro = container.querySelector("p");
  expect(intro.textContent).toContain(
    "AffableBean Co knows that you care how information about you is used and shared and we appreciate your trust in us to do that carefully and sensibly. This notice describes the privacy policy of AffableBean Co."
  );
});
