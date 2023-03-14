import PostById from './PostById';
import Post from "../post/Post";
const navigate = () => {};


describe("PostById", () => {
    it('calls the /posts/:postId endpoint and displays the post', () => {
        const postId = 1;
        const post = {_id: postId, message: "Hello, world"}
        window.localStorage.setItem("token", "fakeToken");

        cy.intercept("GET", `/posts/**`, (req) => {
            req.reply({
                statusCode: 200,
                body:{
                    post: post 
                }
            })
        }).as("getPost");

    cy.mount(<PostById navigate={navigate}/>);

    cy.wait("@getPost").then(() => {
        cy.get('[data-cy="post"]')
        .should("contain.text", "Hello, world")
    });
    })
})


