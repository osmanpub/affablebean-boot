import {
  changeValue,
  container,
  mouseClick,
  setupAll
} from "../../../setupTests";

setupAll(() => {
  mouseClick(container.querySelector(".categoryImage")); // dairy category
  mouseClick(container.querySelector("tr button")); // add milk to cart
  mouseClick(container.querySelectorAll("a.bubble")[1]); // view cart
});

it("update milk quantity", () => {
  changeValue(container.querySelector("tr input"), "2"); // update qty from 1 to 2
  mouseClick(container.querySelector("tr button")); // click update
});

// afterAll()
