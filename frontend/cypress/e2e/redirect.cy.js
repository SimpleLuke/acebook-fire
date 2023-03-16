describe("redirect", () => {
  it("redirects from homepage to login based on no token", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.url().should("include", "/login");
  });

  it("redirects from homepage to posts based on token", () => {
    cy.visit("/signup");
    cy.signup("name", "surname", "someone@example.com", "password");

    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(1000);

    cy.visit("/");
    cy.wait(1000);
    cy.url().should("include", "/posts");
    cy.logout();
    cy.wait(5000);
  });

  it("redirects to posts page if logged in and tries to access login route", () => {
    cy.dropCollection("users", { failSilently: true }).then((res) => {
      cy.log(res); // prints 'Collection dropped'
    });

    cy.visit("/signup");
    cy.signup("name", "surname", "someone@example.com", "password");

    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/login");
    cy.url().should("include", "/posts");
    cy.logout();
    cy.wait(5000);
  });

  it("redirects to login page if not logged in and tries to access posts route", () => {
    cy.visit("/posts");
    cy.wait(5000);
    cy.url().should("include", "/login");
  });
});
