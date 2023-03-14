import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Post from "../post/Post";

const PostById = ({ navigate }) => {
  const {postId} = useParams();
  const [post, setPost] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  useEffect(() => {
    if (token) {
      fetch(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => response.json())
        .then((data) => {
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
     {post && <Post post={post} />}
    </div>
  );
};
export default PostById;