import React from "react";
import { useState, useEffect } from "react";

const Post = ({ post }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    if (post.createdAt) {
      const timestampFormatted = post.createdAt.split("T");
      setTime(timestampFormatted[1].slice(0, 5));
      setDate(timestampFormatted[0]);
      setFullName(`${post.firstName} ${post.lastName}`);
    }
  }, []);

  return (
    <article data-cy="post" key={post._id}>
      <br />
      <b>{fullName}</b> <br />
      {post.message} <br />
      {<img src={post.path} alt="This is from a post" />}
      <small>
        {time} | {date}
      </small>
    </article>
  );
};

export default Post;
