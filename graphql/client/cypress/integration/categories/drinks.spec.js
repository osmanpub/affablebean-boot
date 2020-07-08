describe("Drinks Category", () => {
  it("should load all drinks products", () => {
    cy.get("[data-cy=category-drinks]").click();
    cy.get('[data-cy="product-green tea"] > :nth-child(2)').contains(
      "green tea"
    );
  });
});
