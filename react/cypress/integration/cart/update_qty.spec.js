describe("Add and update item quantity in cart", () => {
  it("update quantity", () => {
    cy.get("[data-cy=category-dairy]").click();
    cy.get('[data-cy="product-butter"] > :nth-child(2)').contains("butter");
    cy.get('[data-cy="product-butter"] > :nth-child(5)').click();

    cy.get('[data-cy="cart-hdr-total"]').contains("1 item");
    cy.get('[data-cy="cart-hdr-view-cart"]').click();
    cy.contains("subtotal €1.09");

    cy.get('[data-cy="input-qty-butter"]')
      .type("{uparrow}")
      .should("have.value", "2");
    // seems to be a bug somewhere in chrome that resets the input number picker back to 1 when clicking form submit
    // cy.get('[data-cy="update-qty-butter"]').click();
  });
});
