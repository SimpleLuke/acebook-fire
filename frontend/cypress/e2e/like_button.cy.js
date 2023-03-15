beforeEach(() => {
  cy.dropCollection("posts", { failSilently: true }).then((res) => {
    cy.log(res); // prints 'Collection dropped'
  });

  cy.visit("/signup");
  cy.signup("name", "surname", "someone@example.com", "password");
  cy.visit("/login");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
  cy.wait(1000);
  cy.visit("/posts");
});

afterEach(() => {
  cy.dropCollection("users", { failSilently: true }).then((res) => {
    cy.log(res); // prints 'Collection dropped'
  });
});

describe("Post", () => {
  it("toggles like button with a new post", () => {
    cy.get('input[data-cy="post-input"]').first().type("This is a new post");
    cy.get('button[data-cy="form-submit"]').first().click();
    cy.wait(1000);
    cy.get('[data-cy="like-element"]')
      .first()
      .should("contain.text", "0 likes");
    cy.get('[data-cy="likeButton"]').first().click();
    cy.get('[data-cy="like-element"]').first().should("contain.text", "1 like");
    cy.get('[data-cy="likeButton"]').first().should("contain.text", "Unlike");
    cy.get('[data-cy="likeButton"]').first().click();

    cy.get('[data-cy="likeButton"]').first().should("contain.text", "Like");
    cy.logout();
  });
});
