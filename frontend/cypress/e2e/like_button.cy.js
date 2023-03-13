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
    cy.get('[data-cy="likeButton"]').click();
    cy.get('[data-cy="likeButton"]').should('contain.text', 'Unlike');
    cy.get('[data-cy="likeButton"]').click();
    cy.get('[data-cy="likeButton"]').should('contain.text', 'Like');
  })
 })