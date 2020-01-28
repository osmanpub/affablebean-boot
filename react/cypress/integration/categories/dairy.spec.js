describe("Dairy Category", () => {
  it("should load all dairy products", () => {
    cy.get("[data-cy=category-dairy]").click();
    cy.get('[data-cy="product-cheese"] > :nth-child(2)').contains("cheese");
  });
});
