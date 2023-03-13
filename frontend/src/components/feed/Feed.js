import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Post from '../post/Post'
import Navbar from '../navbar/Navbar';
import './Feed.css'
import {Link} from 'react-router-dom'

const Feed = ({ navigate,userData,storeUserData }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: newPost }),
    });
    setPosts([...posts, newPost]);
    setNewPost("");
    navigate(0);
  };


  if (token) {
    return (
      <>
        <Navbar navigate={navigate} userData={userData} storeUserData={storeUserData}/>
        <h2>Posts</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Add a new post:
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
            <BrowserRouter>
            <Link to = {`/posts/${post._id}`} key={post._id}>
            <Post post={post}/>
            </Link>
            </BrowserRouter>
          ))}
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
