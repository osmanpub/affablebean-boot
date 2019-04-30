import ReactTestUtils from "react-dom/test-utils";
import { act } from "react-dom/test-utils";
import { container, setupAll } from "../tests/setup";

setupAll(() => {
  const category = container.querySelector(".categoryImage"); // dairy

  act(() => {
    category.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // add milk to cart
  const add = container.querySelector("tr button");

  act(() => {
    add.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const cart = container.querySelector("span.horizontalMargin");
  expect(cart.textContent).toContain("1 items");

  const viewCart = container.querySelectorAll("a.bubble")[1];

  act(() => {
    viewCart.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});

it("update milk quantity", () => {
  const input = container.querySelector("tr input");

  input.value = "2";
  ReactTestUtils.Simulate.change(input);

  const update = container.querySelector("tr button");

  act(() => {
    update.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});
