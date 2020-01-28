describe("Home Page", () => {
  it("contains welcome message", () => {
    cy.get("[data-cy=home-welcome]").should(
      "contain",
      "Welcome to the online home of the Affable Bean Green Grocer."
    );
  });
});
