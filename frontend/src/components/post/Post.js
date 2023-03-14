import React, { useState,useEffect } from 'react';

const Post = ({post}) => {
  const [clicked, setClicked] = useState(false);
  const [likeCount, setLikeCount] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [fullName, setFullName] = useState("")

  const fetchPostLikes = () => {
    console.log("postId frontend", post._id)
    fetch(`/posts/${post._id}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setLikeCount(data.post.likes.length);
        //console.log(data)
      });
  };

  useEffect(()=>{
    fetchPostLikes()
  },[])

  useEffect(()=>{if (post.createdAt){
    const timestampFormatted = post.createdAt.split('T')
    setTime(timestampFormatted[1].slice(0,5))
    setDate(timestampFormatted[0])
    setFullName(`${post.firstName} ${post.lastName}`)
  }},[])


  const handleClick = (event) => {
    event.preventDefault()
    if (clicked) {
      
    } else {
      
    }
    fetchPostLikes()
    setClicked(!clicked);
  };

  return(
    <>
      <article data-cy="post" key={ post._id }> 
      <br/>
      <b>{fullName}</b> <br/>
      {post.message} <br/>
      <small>{time} | {date}</small>
      <p data-cy="like-element">{likeCount===1?`${likeCount} like`:`${likeCount} likes`}</p>
      <button data-cy="likeButton" onClick={handleClick}>{clicked ? 'Unlike' : 'Like'}</button>
      </article>
    </>
  )
}

export default Post;
