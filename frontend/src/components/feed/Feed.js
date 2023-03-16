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
  const [isSent, setIsSent] = useState(false);

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

    let postData = {
      message: newPost,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const imageData = await axios.post("/upload", formData, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      postData = {
        ...postData,
        filename: imageData.data.filename,
        path: imageData.data.path,
      };
    }

    await axios.post("/posts", postData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setIsSent(true);
    setNewPost("");
    setImage(null);
    fetchPosts();
  };

  const handleImageUpload = (file) => {
    setImage(file);
    setIsSent(false);
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
          <label htmlFor="post-input">Add a new post:</label>
          <input
            name="post-input"
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            data-cy="post-input"
          />
          <Image
            type="file"
            isSent={isSent}
            handleImageUpload={handleImageUpload}
          />
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
