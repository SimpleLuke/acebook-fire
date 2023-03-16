import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = ({ post }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [fullName, setFullName] = useState("");
  const { postId } = useParams();
  useEffect(() => {
    if (post.createdAt) {
      const timestampFormatted = post.createdAt.split("T");
      setTime(timestampFormatted[1].slice(0, 5));
      setDate(timestampFormatted[0]);
      setFullName(`${post.firstName} ${post.lastName}`);
    }
    console.log(postId);
  }, []);

  return (
    <article data-cy="post" key={post._id}>
      <br />
      <b>{fullName}</b> <br />
      {post.message} <br />
      {<img src={!postId ? post.path : `../${post.path}`} alt="" />}
      <small>
        {time} | {date}
      </small>
    </article>
  );
};

export default Post;
