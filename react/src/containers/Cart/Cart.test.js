import ReactTestUtils from "react-dom/test-utils";
import { container, mouseClick, setupAll } from "../tests/setup";

setupAll(() => {
  mouseClick(container.querySelector(".categoryImage")); // dairy category

  // add milk to cart
  mouseClick(container.querySelector("tr button"));

  mouseClick(container.querySelectorAll("a.bubble")[1]); // view cart
});

it("update milk quantity", () => {
  const input = container.querySelector("tr input");

  input.value = "2";
  ReactTestUtils.Simulate.change(input);

  mouseClick(container.querySelector("tr button")); // update qty from 1 to 2
});
