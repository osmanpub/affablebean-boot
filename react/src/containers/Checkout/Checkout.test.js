import { container, changeValue, mouseClick, setupAll } from "../tests/setup";

setupAll(() => {
  mouseClick(container.querySelector(".categoryImage")); // dairy category

  mouseClick(container.querySelector("tr button")); // add milk to cart
  mouseClick(container.querySelectorAll("a.bubble")[1]); // view cart

  changeValue(container.querySelector("tr input"), "2"); // update qty from 1 to 2
  mouseClick(container.querySelector("tr button")); // click update

  mouseClick(container.querySelectorAll("a.bubble")[0]); // checkout cart
});

it("pay for items in cart", () => {
  const inputs = container.querySelectorAll("input");

  // fill in form
  changeValue(inputs[0], "Joe Sixpack Jr");
  changeValue(inputs[1], "joe@gmail.com");
  changeValue(inputs[2], "1-800-JOE-SIXPACK");
  changeValue(inputs[3], "1600 King of Beers Avenue, Washington DC");
  changeValue(inputs[4], "1234567890123456789");

  mouseClick(container.querySelector("button.btn-primary")); // purchase
  const confirmation = container.querySelector("strong");

  expect(confirmation.textContent).toContain(
    "Your order has been successfully processed and will be delivered within 24 hours."
  );

  const price = container.querySelector("td.confirmationPriceColumn");
  expect(price.textContent).toContain("3.40");

  const qty = container.querySelector("td.quantityColumn");
  expect(qty.textContent).toContain("2");

  const product = container.querySelectorAll("td")[3];
  expect(product.textContent).toContain("milk");

  const surcharge = container.querySelectorAll("td")[8];
  expect(surcharge.textContent).toContain("3.00");

  const amount = container.querySelectorAll("td")[10];
  expect(amount.textContent).toContain("6.40");

  const customer = container.querySelectorAll("td")[13];
  expect(customer.textContent).toContain("Joe Sixpack Jr");
});
