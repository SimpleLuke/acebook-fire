import React, { useState } from 'react';

const Post = ({post}) => {
  const [clicked, setClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleClick = () => {
    if (clicked) {
      setLikeCount(likeCount - 1);
    } else {
    
      setLikeCount(likeCount + 1);
    }
    setClicked(!clicked);
  };

  return(
    <>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
      <p>{likeCount}</p>
      <button data-cy="likeButton" onClick={handleClick}>{clicked ? 'Unlike' : 'Like'}</button>
    </>
  )
}

export default Post;
