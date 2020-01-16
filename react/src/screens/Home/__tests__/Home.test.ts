import { container, setupAll } from "../../__tests__/setup";

setupAll();

it("load home page", () => {
  const greeting = container.querySelector("p");

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
