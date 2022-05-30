describe("Renders the app correctly", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the unread section", () => {
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").should("exist");
      cy.get(".email-box .status").should("have.class", "bg-green");
      cy.get("[data-cy=headerDay]").should("exist").should("not.be.empty");
      cy.get("[data-cy=headerMonth]").should("exist").should("not.be.empty");
      cy.get("[data-cy=initials]").should("exist").should("not.be.empty");
      cy.get("[data-cy=subject]").should("exist").should("not.be.empty");
      cy.get("[data-cy=dateFromNow]").should("exist").should("not.be.empty");
      cy.get("[data-cy=content]").should("exist").should("not.be.empty");
    });
  });

  it("checks if content expands", () => {
    cy.get(".email-box")
      .first()
      .within(() => {
        cy.get(".email-header").click();
        cy.get(".email-content").should("be.visible");
      });
  });

  it("checks the initial count of unread messages", () => {
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").its("length").should("eq", 4);
    });
  });

  it("checks if message is moved to saved section", () => {
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").first().find("input[type=checkbox]").click();
    });
    cy.contains("Save").click();
    cy.get(".section-saved").within(() => {
      cy.get(".email-box").should("exist");
    });
  });

  it("checks if message is deleted from unread section", () => {
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").first().find("input[type=checkbox]").click();
    });
    cy.contains("Delete").click();
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").its("length").should("eq", 3);
    });
  });

  it("checks if message is deleted from saved section", () => {
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").first().find("input[type=checkbox]").click();
    });
    cy.contains("Save").click();
    cy.get(".section-saved").within(() => {
      cy.get(".email-box").should("exist");
      cy.get(".email-box").first().find("input[type=checkbox]").click();
    });

    cy.contains("Delete").click();
    cy.get(".section-saved").within(() => {
      cy.get(".email-box").should("not.exist");
    });
  });
});
