describe("Clear cart", () => {
  it("add, view and clear cart", () => {
    cy.get("[data-cy=category-bakery]").click();
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(2)').contains(
      "seed loaf"
    );
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(5)').click();

    cy.get('[data-cy="cart-hdr-total"]').contains("1 item");
    cy.get('[data-cy="cart-hdr-view-cart"]').click();
    cy.contains("subtotal €1.89");

    cy.get('[data-cy="clear-cart"]').click();

    cy.get("[data-cy=cart-info]").should(
      "contain",
      "Your shopping cart is empty"
    );
  });
});
