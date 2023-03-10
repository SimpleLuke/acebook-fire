import React, { useState, useEffect } from 'react';
import Post from '../post/Post';
import {useParams} from 'react-router-dom';

const PostById = ({ navigate }) => {
  const {postId} = useParams();
  const [post, setPost] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPost(data.post);
        })
        .catch((error) => {
          console.log("Error fetching post:", error);
        });
    }
  }, [postId, token]);

  return (
    <div>
      <Post post={post} />
    </div>
  );
};

export default PostById;
