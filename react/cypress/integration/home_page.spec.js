describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("contains welcome message", () => {
    cy.get("p")
      .first()
      .should(
        "contain",
        "Welcome to the online home of the Affable Bean Green Grocer."
      );
  });
});
