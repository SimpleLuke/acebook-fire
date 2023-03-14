describe("Signing in", () => {

  before( () => {
   cy.signup("name", "surname", "someone@example.com", "password");
  })

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();
 
    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });


  it("with valid credentials, redirects to '/posts'", () => {
   cy.visit("/login");
   cy.get("#email").type("someone@example.com");
   cy.get("#password").type("password");
   cy.get("#submit").click();

   cy.url().should("include", "/posts");
  });

  it('redirects to /signup when sign up button is clicked',()=>{
    cy.visit('/login')
    cy.get("#signup").should('exist')
    cy.get("#signup").click()
    cy.url().should('include','/signup')
  })
});