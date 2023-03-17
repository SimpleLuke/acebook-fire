import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostById from "../postById/PostById";
import { Link } from "react-router-dom";

const Comments = ({ navigate, userData, storeUserData }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newComment, setNewComment] = useState("");

  const fetchComments = () => {
    return fetch(`/posts/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setComments(data.comments);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newComment }),
    });
    setNewComment("");
    fetchComments();
  };

  if (token) {
    return (
      <>
        <div className="flex w-1/2 mx-auto pt-5 items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://www.pngitem.com/pimgs/m/76-760235_hair-illustration-art-female-head-icon-png-transparent.png"
              alt=""
            />
          </div>
          <form onSubmit={handleSubmit} className="relative w-full">
            <div className="overflow-hidden rounded-t-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                data-cy="comment-input"
                rows={3}
                name="comment"
                id="comment"
                className="block w-full p-2 resize-none border-0 bg-white bg-opacity-70 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
                placeholder="Add your comment..."
                defaultValue={""}
              />

              {/* Spacer element to match the height of the toolbar */}
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
            </div>

            <div className="rounded-b-lg bg-white bg-opacity-70 inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <div className="flex items-center space-x-5">
                <div className="flex items-center"></div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  data-cy="form-submit"
                  className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
        <div id="commentFeed" role="commentFeed">
          {comments?.length > 0 ? (
            [...comments].reverse().map((comment) => (
              <div
                key={comment.id}
                className="w-1/2 mx-auto my-10 p-5 col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
              >
                {comment}
              </div>
            ))
          ) : (
            <div className="w-1/2 mx-auto my-10 p-5 col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <p>No comments yet</p>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default Comments;
