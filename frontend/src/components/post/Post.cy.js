import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", createdAt: "2023-03-09T16:44:33.461Z"}} userData={{_id:1}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })
})
