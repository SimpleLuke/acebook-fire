//cy.signup("name", "surname", "someone@example.com", "password");

describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("/signup");
    cy.get("nav").should("not.exist");
    cy.signup("name", "surname", "someone@example.com", "password");
    cy.visit("/login");
    cy.get("nav").should("not.exist");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(1000);
  });

  afterEach(() => {
    cy.dropCollection("users", { failSilently: true }).then((res) => {
      cy.log(res); // prints 'Collection dropped'
    });
  });

  it("shows navbar once user has signed in", () => {
    cy.get("nav").should("exist").and("contain", "Home");
  });

  it("redirects to home page when home button clicked", () => {
    cy.get("nav").should("exist").and("contain", "Home");
    cy.get('[data-cy="homeButton"]').click();
    cy.url().should("include", "/posts");
  });

  it("redirects to login page when logout button clicked", () => {
    cy.get("nav").should("exist").and("contain", "Home");
    cy.get('[data-cy="logoutButton"]').click();
    cy.url().should("include", "/login");
  });

  it("shows first name in nav bar", () => {
    cy.get("nav").should("exist").and("contain", "Home");
    cy.get('[data-cy="user-first-name"]').should("contain.text", "name");
  });
});
