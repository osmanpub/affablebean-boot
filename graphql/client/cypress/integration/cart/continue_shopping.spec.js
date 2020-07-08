describe("Continue shopping", () => {
  it("add and view cart, continue shopping", () => {
    cy.get("[data-cy=category-bakery]").click();
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(2)').contains(
      "seed loaf"
    );
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(5)').click();

    cy.get('[data-cy="cart-hdr-total"]').contains("1 item");
    cy.get('[data-cy="cart-hdr-view-cart"]').click();
    cy.contains("subtotal €1.89");

    cy.get('[data-cy="continue-shopping"]').click();

    // we should be back on the home page
    cy.get("[data-cy=home-welcome]").should(
      "contain",
      "Welcome to the online home of the Affable Bean Green Grocer."
    );
  });
});
