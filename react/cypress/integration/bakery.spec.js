describe("Bakery Category", () => {
  it("should load all bakery products", () => {
    const bakery = cy.get("img.categoryImage").first();
    bakery.click();

    const seedLoaf = cy.get("tbody > :nth-child(1) > :nth-child(2)");
    seedLoaf.contains("seed loaf");
  });
});
