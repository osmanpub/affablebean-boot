import { setupAll, container } from "../../setupTests";

setupAll();

it("load home page", () => {
  const greeting = container.querySelector("p");
  // console.warn(greeting)
  expect(greeting.textContent).toBe(
    "Welcome to the online home of the Affable Bean Green Grocer."
  );

  const headerLogo = container.querySelector("#logoText");
  expect(headerLogo.alt).toBe("the affable bean");

  // privacy and contact buttons
  const footerButtons = container.querySelectorAll(".btn-link");
  expect(footerButtons.length).toBe(2);

  const categories = container.querySelectorAll(".categoryBox");
  expect(categories.length).toBe(6);
});
