describe("Signing up", () => {
  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#firstName").type("someone");
    cy.get("#lastName").type("smith");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });

  it("with valid credentials, redirects to '/login'", () => {
    cy.visit("/signup");
    cy.get("#firstName").type("someone");
    cy.get("#lastName").type("smith");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
    cy.dropCollection("users", { failSilently: true }).then((res) => {
      cy.log(res); // prints 'Collection dropped'
    });
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#firstName").type("someone");
    cy.get("#lastName").type("smith");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });

  it("with missing name, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("email");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
});
