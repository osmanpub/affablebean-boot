describe("Add bakery item to cart", () => {
  beforeEach(() => {
    const bakery = cy.get("img.categoryImage").first();
    bakery.click();
  });

  const addToCart = () => {
    const seedLoaf = cy.get("tbody > :nth-child(1) > :nth-child(2)");
    seedLoaf.contains("seed loaf");

    const add = cy.get(":nth-child(1) > :nth-child(5) > .btn");
    add.click();

    const basket = cy.get(".horizontalMargin");
    basket.contains("1 item");
  };

  const viewCart = () => {
    cy.contains("view cart").click();
    cy.get('[href="/viewCart/true"]');
    cy.contains("subtotal €1.89");
  };

  it("add seedloaf to cart", () => {
    addToCart();
  });

  it("view cart", () => {
    addToCart();
    viewCart();
  });

  it("update quantity", () => {
    addToCart();
    viewCart();
    cy.get("input").type("{uparrow}");
  });
});
