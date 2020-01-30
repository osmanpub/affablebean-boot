describe("Add multiple items to cart", () => {
  it("add seedloaf, cheese and chicken items to cart and view cart screen", () => {
    cy.get("[data-cy=category-bakery]").click();
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(2)').contains(
      "seed loaf"
    );
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(5)').click();

    cy.get("[data-cy=category-dairy]").click();
    cy.get('[data-cy="product-cheese"] > :nth-child(2)').contains("cheese");
    cy.get('[data-cy="product-cheese"] > :nth-child(5)').click();

    cy.get("[data-cy=category-meats]").click();
    cy.get('[data-cy="product-chicken leg"] > :nth-child(2)').contains(
      "chicken"
    );
    cy.get('[data-cy="product-chicken leg"] > :nth-child(5)').click();

    cy.get('[data-cy="cart-hdr-total"]').contains("3 items");
    cy.get('[data-cy="cart-hdr-view-cart"]').click();
    cy.contains("subtotal €6.87");
  });
});
