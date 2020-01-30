describe("Contact Page", () => {
  it("load and fill out contact form", () => {
    cy.get("[data-cy=contact]").click();
    cy.get("[data-cy=contact-intro]").should("contain", "Contact Us Form");

    cy.get('[data-cy="contact-name"]').type("Joe Bloggs");
    cy.get('[data-cy="contact-email"]').type("JoeBloggs@gmail.com");
    cy.get('[data-cy="contact-msg"]').type("Nice job on the website mate!");

    cy.get('[data-cy="contact-submit"]').click();
  });
});
