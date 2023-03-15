beforeEach( () => {
  cy.visit("/signup");
  cy.signup("name", "surname", "someone@example.com", "password");
  cy.visit("/login");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
  cy.wait(1000);
  cy.visit("/posts");
 })

 describe('Post', () => {
  it('toggles like button', () => {
    cy.get('[data-cy="likeButton"]').first().click();
    cy.get('[data-cy="likeButton"]').first().should('contain.text', 'Unlike');
    cy.get('[data-cy="likeButton"]').first().click();
    cy.get('[data-cy="likeButton"]').first().should('contain.text', 'Like');
    cy.logout();
  })

  it("sign up, login and make a new post", () => {
    cy.get('input[data-cy="post-input"]').first().type("This is a new post");
    cy.get('button[data-cy="form-submit"]').first().click();
    cy.wait(1000);
    cy.get('[data-cy="post"]').first().should("contain.text", "This is a new post");
    cy.get('[data-cy="post"]').first().should("contain.text", "name surname");
    cy.get('[data-cy="post"]').first().should("contain.text", '2023');

    cy.get('[data-cy="like-element"]').first().should("contain.text", '0 likes');
  });

  
  
 })