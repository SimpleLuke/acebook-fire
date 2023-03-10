import React, { useState } from 'react';
import {useParams} from 'react-router-dom';

const PostById = ({ navigate }) => {
  const {postID} = useParams();
  const [post, setPost] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleOnClick = async (event) => {
    event.preventDefault();

    await fetch('/posts/:postID', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,    
      },
      body: JSON.stringify({message: post}),
    });

  }
  /*useEffect(() => {
    if (token) {
      fetch(`/posts/${postID}`, {
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
  }, [postID, token]);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );*/
};

export default PostById;
