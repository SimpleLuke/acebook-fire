import LogInForm from './LoginForm'
const navigate = () => {}

describe("Logging in", () => {
  it("calls the /tokens endpoint", () => {
    cy.mount(<LogInForm navigate={navigate}/>)

    cy.intercept('POST', '/tokens', { token: "fakeToken" }).as("loginRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait('@loginRequest').then( interception => {
      expect(interception.response.body.token).to.eq("fakeToken")
    })
  })

  it('checks the sign up button exist',()=>{
    cy.mount(<LogInForm navigate={navigate}/>)
    cy.get("#submit").should('exist')
  })
})
