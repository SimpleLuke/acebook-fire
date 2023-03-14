import Feed from "./Feed";
import { BrowserRouter } from 'react-router-dom';

const navigate = () => {};

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("GET", "/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, message: "Hello, world", createdAt: "2023-03-09T16:44:33.461Z"},
            { _id: 2, message: "Hello again, world", createdAt: "2023-03-09T16:44:33.461Z"}
          ],
        },
      });
    }).as("getPosts");

    cy.mount(<BrowserRouter><Feed navigate={navigate} /></BrowserRouter>);

    cy.wait("@getPosts").then(() => {
      cy.get('[data-cy="post"]')
        .should("contain.text", "Hello, world")
        .and("contain.text", "Hello again, world");
   });
  });

  it("sends a post request to /posts and response a OK message", () => {
    window.localStorage.setItem("token", "fakeToken");

    cy.intercept("POST", "/posts", {message: "OK"}).as("newPostRequest")

    cy.mount(<Feed navigate={navigate} userData={{firstName: "james", lastName:"Mcleish"}}/>);
    cy.get('input[data-cy="post-input"]').should("exist");
    cy.get('input[data-cy="post-input"]').type("This is a new post");
    cy.get('button[data-cy="form-submit"]').should("exist");
    cy.get('button[data-cy="form-submit"]').click();
    cy.wait("@newPostRequest")
      .its("response.body.message")
      .should("equal", "OK");
  });
});
