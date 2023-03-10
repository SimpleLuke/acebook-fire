import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import { useParams } from "react-router-dom";

const PostById = ({ navigate }) => {
  const [post, setPost] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const { postId } = useParams();

  useEffect(() => {
    if (token) {
      fetch(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPost(data.post);
        });
    }
  }, []);

  return <Post post={post} />;
};

export default PostById;
