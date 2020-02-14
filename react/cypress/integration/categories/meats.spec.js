describe("Meats Category", () => {
  it("should load all meat products", () => {
    cy.get('[data-cy="category-meats"]').click();
    cy.get('[data-cy="product-sausages"] > :nth-child(2)').contains("sausages");
  });
});
