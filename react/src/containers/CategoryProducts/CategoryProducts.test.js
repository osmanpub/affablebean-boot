import { container, mouseClick, setupAll } from "../tests/setup";

setupAll(() => {
  mouseClick(container.querySelector(".categoryImage")); // dairy category
});

it("loads dairy products", () => {
  const categories = container.querySelectorAll("span.categoryText");
  expect(categories.length).toBe(6);

  // four products in total
  let rows = container.querySelectorAll("tr.white");
  expect(rows.length).toBe(2);

  rows = container.querySelectorAll("tr.lightBlue");
  expect(rows.length).toBe(2);
});

it("add milk to cart", () => {
  mouseClick(container.querySelector("tr button")); // add button

  const cart = container.querySelector("span.horizontalMargin");
  expect(cart.textContent).toContain("1 items");
});
