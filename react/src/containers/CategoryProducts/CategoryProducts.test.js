import { act } from "react-dom/test-utils";
import { container, setupAll } from "../tests/setup";

setupAll(() => {
  const category = container.querySelector(".categoryImage"); // dairy

  act(() => {
    category.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});

it("loads dairy products", () => {
  const categories = container.querySelectorAll("span.categoryText");
  expect(categories.length).toBe(6);

  let rows = container.querySelectorAll("tr.white");
  expect(rows.length).toBe(2);

  rows = container.querySelectorAll("tr.lightBlue");
  expect(rows.length).toBe(2);
});

it("add milk to cart", () => {
  const add = container.querySelector("tr button");

  act(() => {
    add.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const cart = container.querySelector("span.horizontalMargin");
  expect(cart.textContent).toContain("1 items");
});
