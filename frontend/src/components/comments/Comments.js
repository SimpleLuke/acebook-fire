import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import Navbar from '../navbar/Navbar';
import './Feed.css'
import {Link} from 'react-router-dom'

const Feed = ({ navigate, userData, storeUserData }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newComment, setNewComment] = useState("");



if (token) {
    return (
      <>
        <Navbar
          navigate={navigate}
          userData={userData}
          storeUserData={storeUserData}
        />
        <h2>Comments</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Add a new comment:
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              data-cy="post-input"
            />
          </label>
          <button type="submit" data-cy="form-submit">
            Post
          </button>
        </form>
        <div id="feed" role="feed">
          {[...posts].reverse().map((post) => (
            
            <Link to = {`/posts/${post._id}`} key={post._id}>
              <Post post={post}/>
            </Link>
            
          ))}
        </div>
      </>
    );
  }
};

export default Feed;
