describe("Make a new post", () => {
  beforeEach(() => {
    cy.signup("name", "surname", "someone@example.com", "password");
    cy.wait(1000);
  });
  afterEach(() => {
    cy.dropCollection("users", { failSilently: true }).then((res) => {
      cy.log(res); // prints 'Collection dropped'
    });
  });
  it("sign up, login and make a new post", () => {
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait(1000);
    cy.get('[data-cy="post-input"]').type("This is a new post");
    cy.get('button[data-cy="form-submit"]').click();
    cy.wait(1000);
    cy.get('[data-cy="post"]').should("contain.text", "This is a new post");
    cy.get('[data-cy="post"]').should("contain.text", "name surname");
    cy.get('[data-cy="post"]').should("contain.text", "2023");
  });
});
