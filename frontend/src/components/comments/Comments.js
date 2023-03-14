import React, { useEffect, useState } from 'react';
import PostById from '../postById/PostById'
import {Link} from 'react-router-dom'

const Comments = ({ navigate, userData, storeUserData }) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newComment, setNewComment] = useState("");

  // const fetchComments = () => {
  //   fetch("/posts", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(async (data) => {
  //       window.localStorage.setItem("token", data.token);
  //       setToken(window.localStorage.getItem("token"));
  //       setPosts(data.posts);
  //     });
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await fetch("/posts", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       message: newPost,
  //       firstName: userData.firstName,
  //       lastName: userData.lastName,
  //     }),
  //   });
  //   setNewComment("");
  //   fetchComments();
  // };

if (token) {
    return (
      <>
        <h3>Comments</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Add a new comment:
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              data-cy="comment-input"
            />
          </label>
          <button type="submit" data-cy="form-submit">
            Post
          </button>
        </form>
        <div>
        </div>
      </>
    );
  }
};

export default Comments;
