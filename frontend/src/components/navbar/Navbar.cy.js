import Navbar from "./Navbar";

const navigate = () => {};

describe("Navbar", () => {
  it("displays a nav element with home button", () => {
    cy.mount(<Navbar navigate={navigate} />);
    cy.get("nav").should("exist");
    cy.get('[data-cy="homeButton"]').should("exist");
  });

  it("displays logout button", () => {
    cy.mount(<Navbar navigate={navigate} />);
    cy.get("nav").should("exist");
    cy.get('[data-cy="logoutButton"]')
      .should("exist")
      .and("contain", "Log out");
  });

  it("displays name", () => {
    cy.mount(<Navbar navigate={navigate} userData={{ firstName: "Jenny" }} />);
    cy.get("nav").should("exist");
    cy.get('[data-cy="user-first-name"]').should("exist");
    cy.get('[data-cy="user-first-name"]').should("contain", "Jenny");
  });
});
