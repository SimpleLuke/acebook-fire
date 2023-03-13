describe("Make a new post", () => {
  it("sign up, login and make a new post", () => {
    cy.visit("/signup");
    cy.get("#firstName").type("Someone")
    cy.get("#lastName").type("Smith")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(1000);
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(1000);
    cy.get('input[data-cy="post-input"]').type("This is a new post");
    cy.get('button[data-cy="form-submit"]').click();
    cy.wait(1000);
    cy.get('[data-cy="post"]').should("contain.text", "This is a new post");
    cy.get('[data-cy="post"]').should("contain.text", "Someone Smith");
    cy.get('[data-cy="post"]').should("contain.text", '2023');
  });
});

