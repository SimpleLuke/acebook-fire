import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css'

const PostById = ({ navigate }) => {
    const [post, setPost] = useState("");
    const [token, setToken] = useState(window.localStorage.getItem("token"));

useEffect(() => {
    if (token) {
      fetch("/posts/:postID", {
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
}