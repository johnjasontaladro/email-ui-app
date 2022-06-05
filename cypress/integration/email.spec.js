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
      cy.get(".email-box").its("length").should("eq", 2);
    });
  });

  it("checks pagination if able to navigate to next page", () => {
    cy.intercept("GET", "/email-ui-app/data/email-data.json", {
      fixture: "email-three-record.json",
    }).as("getEmailData");

    cy.wait("@getEmailData");

    cy.get('[data-cy="nav-next"]').click();
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").its("length").should("eq", 1);
    });
  });

  it("checks pagination if able to navigate to previous page", () => {
    cy.intercept("GET", "/email-ui-app/data/email-data.json", {
      fixture: "email-three-record.json",
    }).as("getEmailData");

    cy.wait("@getEmailData");

    cy.get('[data-cy="nav-next"]').click();
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").its("length").should("eq", 1);
    });

    cy.get('[data-cy="nav-prev"]').click();
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").its("length").should("eq", 2);
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
    cy.intercept("GET", "/email-ui-app/data/email-data.json", {
      fixture: "email-one-record.json",
    }).as("getEmailData");

    cy.wait("@getEmailData");

    cy.get(".section-unread").within(() => {
      cy.get(".email-box").first().find("input[type=checkbox]").click();
    });
    cy.contains("Delete").click();
    cy.get(".section-unread").within(() => {
      cy.get(".email-box").should("have.text", "No record found.");
    });
  });

  it("checks if message is deleted from saved section", () => {
    cy.intercept("GET", "/email-ui-app/data/email-data.json", {
      fixture: "email-one-record.json",
    }).as("getEmailData");

    cy.wait("@getEmailData");

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
      cy.get(".email-box").should("have.text", "No record found.");
    });
  });
});
