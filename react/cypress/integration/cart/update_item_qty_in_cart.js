describe("Add and update item to cart", () => {
  beforeEach(() => {
    const dairy = cy.get(":nth-child(3) > a > .categoryImage");
    dairy.click();
  });

  const addToCart = () => {
    const butter = cy.get("tbody > :nth-child(3) > :nth-child(2)");
    butter.contains("butter");

    const add = cy.get(":nth-child(3) > :nth-child(5) > .btn");
    add.click();
  };

  const viewCart = () => {
    cy.contains("view cart").click();
    cy.get('[href="/viewCart/true"]');
    cy.contains("subtotal €1.09");
  };

  it("add butter to cart", () => {
    addToCart();
    const basket = cy.get(".horizontalMargin");
    basket.contains("1 item");
  });

  it("view cart", () => {
    addToCart();
    viewCart();
  });

  it("update quantity", () => {
    addToCart();
    viewCart();
    cy.get("input").type("{uparrow}");
    cy.get("form > .btn").click();
  });
});
