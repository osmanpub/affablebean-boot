describe("Cereals Category", () => {
  it("should load all cereal products", () => {
    cy.get("[data-cy=category-cereals]").click();
    cy.get('[data-cy="product-granola"] > :nth-child(2)').contains("granola");
  });
});
