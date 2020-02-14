describe("Fruit & Veg Category", () => {
  it("should load all fruit & veg products", () => {
    cy.get('[data-cy="category-fruit n veg"]').click();
    cy.get('[data-cy="product-broccoli"] > :nth-child(2)').contains("broccoli");
  });
});
