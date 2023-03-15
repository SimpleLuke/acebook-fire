import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import PostById from '../postById/PostById'
import {Link} from 'react-router-dom'

const Comments = ({ navigate, userData, storeUserData }) => {
  const {postId} = useParams();
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newComment, setNewComment] = useState("");

  const fetchComments = () => {
    return fetch(`/posts/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setComments(data.comments);
        console.log("fetchComments test")
        console.log(data) //This returns an array of objects, each being a hashmap of the comment in 
        // in the database, with one character per key (?)
      });
  };

  useEffect(()=>{
    fetchComments()
  },[])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comments: [ ...comments, { 
          // firstName: 'userData.firstName',
          // lastName: 'userData.lastName',
          message: newComment,
          // created_at: Date.now 
        }]
      }),
    });
    console.log("handleSubmit test")
    console.log(comments)// ARRAY IS EMPTY
    setNewComment("");
    fetchComments();
    console.log(...comments)// ARRAY IS STILL EMPTY
  };



if (token) {
    return (
      <>
        <h5>Comments</h5>
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
        <div id="commentFeed" role="commentFeed">
        {comments.length > 0 ? (
          [...comments].reverse().map((comment) => (
            <div><br />{comment}</div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
      </>
    );
  }
};

export default Comments;


{/* <div id="commentFeed" role="commentFeed">
{[...comments].reverse().map((comment) => (
  <Link to={`/posts/${comment._id}`} key={comment._id}>
    <Comments comment={comment} />
  </Link>
))}
</div> */}