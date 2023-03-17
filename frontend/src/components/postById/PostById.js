import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";
import Comments from "../comments/Comments";
import Navbar from "../navbar/Navbar";
import Image from "../image/Image";

const PostById = ({ navigate, userData, storeUserData }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          console.log("DATAAAA:", data.post);
          setPost(data.post);
        })
        .catch((error) => {
          console.log("Error fetching post:", error);
        });
    }
  }, [postId, token]);
  return (
    <>
      <Navbar
        navigate={navigate}
        userData={userData}
        storeUserData={storeUserData}
      />
      <div className="bg-body-background min-h-screen h-auto pt-5 pb-5 flex-col">
        {post && <Post post={post} userData={userData} />}
        <Comments />
      </div>
    </>
  );
};
export default PostById;
