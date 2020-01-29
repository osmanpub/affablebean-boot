describe("Proceed to checkout", () => {
  it("proceed to checkout from cart", () => {
    cy.get("[data-cy=category-bakery]").click();
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(2)').contains(
      "seed loaf"
    );
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(5)').click();

    cy.get('[data-cy="cart-hdr-total"]').contains("1 item");
    cy.get('[data-cy="cart-hdr-view-cart"]').click();
    cy.contains("subtotal €1.89");

    cy.get('[data-cy="proceed-checkout"]').click();

    cy.get("[data-cy=checkout-intro]").should(
      "contain",
      "In order to purchase the items in your shopping cart, please provide us with the following information:"
    );
  });
});
