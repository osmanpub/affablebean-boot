import { container, queries, setupAll } from "../../../setupTests";

describe("<Home />", () => {
  setupAll();

  it("show welcome paragraph", () => {
    const { getByTestId } = queries;
    const paragraph = getByTestId(/home-welcome/i);
    // @ts-ignore
    expect(paragraph).toBeInTheDocument();
  });

  // it("don't show view cart link", () => {
  //   const { getByText } = queries;
  //   const link = getByText(/view cart/i);
  //   // @ts-ignore
  //   expect(link).not.toBeVisible();
  // });

  // it("renders correctly", () => {
  //   const greeting = container.querySelector("p");
  //   // @ts-ignore
  //   expect(greeting.textContent).toBe(
  //     "Welcome to the online home of the Affable Bean Green Grocer."
  //   );

  //   const headerLogo = container.querySelector("#logoText");
  //   // @ts-ignore
  //   expect(headerLogo.alt).toBe("the affable bean");

  //   // privacy and contact buttons
  //   const footerButtons = container.querySelectorAll(".btn-link");
  //   // @ts-ignore
  //   expect(footerButtons.length).toBe(2);

  //   const categories = container.querySelectorAll(".categoryBox");
  //   // @ts-ignore
  //   expect(categories.length).toBe(6);
  // });
});
