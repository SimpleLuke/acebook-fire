import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/20/solid";
const Post = ({ post, userData }) => {
  const { postId } = useParams();
  const [clicked, setClicked] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [fullName, setFullName] = useState("");

  const fetchPostLikes = () => {
    return fetch(`/posts/${post._id}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setLikeCount(data.post.likes.length);
      });
  };

  const checkUserLike = () => {
    return fetch(`/posts/${post._id}/userLike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userData?._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setClicked(data.isLike);
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
      });
  };

  const updateLike = () => {
    return fetch(`/posts/${post._id}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userData?._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
      });
  };

  useEffect(() => {
    checkUserLike();
    // fetchPostLikes()
    setLikeCount(post.likes.length);
  }, []);

  useEffect(() => {
    if (post.createdAt) {
      const timestampFormatted = post.createdAt.split("T");
      setTime(timestampFormatted[1].slice(0, 5));
      setDate(timestampFormatted[0]);
      setFullName(`${post.firstName} ${post.lastName}`);
    }
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();

    await updateLike();
    await fetchPostLikes();
    setClicked(!clicked);
  };

  return (
    <>
      <div
        data-cy="post"
        key={post.id}
        className="w-1/2 mx-auto my-10 col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
      >
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={
                  "https://www.pngitem.com/pimgs/m/76-760235_hair-illustration-art-female-head-icon-png-transparent.png"
                }
                alt=""
              />
              <h3 className="truncate text-sm font-medium text-gray-900">
                {fullName}
              </h3>
              <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {time} | {date}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-gray-500">
              {post.message}
            </p>
            {
              <img
                className="w-full"
                src={!postId ? post.path : `../${post.path}`}
                alt=""
              />
            }

            <p
              data-cy="like-element"
              className="mt-1 truncate text-sm text-gray-500"
            >
              {likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
            </p>
          </div>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <button
                data-cy="likeButton"
                onClick={handleClick}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <HandThumbUpIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {clicked ? "Unlike" : "Like"}
              </button>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <a className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <ChatBubbleOvalLeftEllipsisIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Comment
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
