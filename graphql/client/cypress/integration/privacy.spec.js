describe("Privacy Page", () => {
  it("load privacy page", () => {
    cy.get("[data-cy=privacy]").click();
    cy.get("[data-cy=privacy-intro]").should(
      "contain",
      "AffableBean Co knows that you care how information about you is used and shared and we appreciate your trust in us to do that carefully and sensibly. This notice describes the privacy policy of AffableBean Co."
    );
  });
});
