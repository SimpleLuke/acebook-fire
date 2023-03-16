import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Image from "../image/Image";
import Navbar from "../navbar/Navbar";
import "./Feed.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Feed = ({ navigate, userData, storeUserData }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);

  const fetchPosts = () => {
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
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== "undefined"
    ) {
      fetchPosts();
    } else {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    let imageData = {};
    if (image) {
    formData.append("image", image);
    imageData = await axios.post("/upload", formData, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    }

    const postData = {
      message: newPost,
      firstName: userData.firstName,
      lastName: userData.lastName,
      filename: imageData.data.filename,
      path: imageData.data.path,
    };

    await axios.post("/posts", postData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setNewPost("");
    setImage(null);
    fetchPosts();
  };

  const handleImageUpload = (file) => {
    setImage(file);
  };

  if (token) {
    return (
      <>
        <Navbar
          navigate={navigate}
          userData={userData}
          storeUserData={storeUserData}
        />
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
          <Image type="file" handleImageUpload={handleImageUpload} />
          <button type="submit" data-cy="form-submit">
            Post
          </button>
        </form>
        <div id="feed" role="feed">
          {[...posts].reverse().map((post) => (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <Post post={post} />
            </Link>
          ))}
        </div>
      </>
    );
  }
};

export default Feed;
