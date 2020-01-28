describe("Add item to cart", () => {
  it("add seedloaf to cart and view cart screen", () => {
    cy.get("[data-cy=category-bakery]").click();
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(2)').contains(
      "seed loaf"
    );
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(5)').click();

    cy.get(".horizontalMargin").contains("1 item");
    cy.contains("view cart").click();
    cy.get('[href="/viewCart/true"]');
    cy.contains("subtotal €1.89");
  });
});
