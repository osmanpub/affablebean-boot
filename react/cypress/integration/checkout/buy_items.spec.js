describe("Buy products", () => {
  it("fill in form to pay for products in cart", () => {
    cy.get("[data-cy=category-bakery]").click();
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(2)').contains(
      "seed loaf"
    );
    cy.get('[data-cy="product-sunflower seed loaf"] > :nth-child(5)').click();

    cy.get('[data-cy="cart-hdr-total"]').contains("1 item");
    cy.get('[data-cy="cart-hdr-view-cart"]').click();
    cy.contains("subtotal €1.89");

    cy.get('[data-cy="proceed-checkout"]').click();
    cy.get('[data-cy="checkout-name"]').type("Joe Bloggs");
    cy.get('[data-cy="checkout-email"]').type("JoeBloggs@gmail.com");
    cy.get('[data-cy="checkout-phone"]').type("077701234567");
    cy.get('[data-cy="checkout-address"]').type(
      "Mind your own business mate, York"
    );
    cy.get('[data-cy="checkout-cc"]').type("1234567890123456");

    cy.get('[data-cy="checkout-submit"]').click();

    cy.get("[data-cy=confirm-success]").should(
      "contain",
      "Your order has been successfully processed and will be delivered within 24 hours"
    );
  });
});
