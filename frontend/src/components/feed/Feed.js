import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Image from "../image/Image";
import Navbar from "../navbar/Navbar";
import "./Feed.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";

const Feed = ({ navigate, userData, storeUserData }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const fetchPosts = () => {
    fetch("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts(data.posts);
        console.log(data.posts);
      });
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== "undefined"
    ) {
      fetchPosts();
    } else {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let postData = {
      message: newPost,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const imageData = await axios.post("/upload", formData, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      postData = {
        ...postData,
        filename: imageData.data.filename,
        path: imageData.data.path,
      };
    }

    await axios.post("/posts", postData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: newPost,
        firstName: userData.firstName,
        lastName: userData.lastName,
      }),
      //  body: JSON.stringify({ message: newPost})
    });

    setIsSent(true);
    setNewPost("");
    setImage(null);
    fetchPosts();
  };

  const handleImageUpload = (file) => {
    setImage(file);
    setIsSent(false);
  };

  if (token) {
    return (
      <>
        <Navbar
          navigate={navigate}
          userData={userData}
          storeUserData={storeUserData}
        />
        <div className="bg-body-background min-h-screen flex-col">
          <div className="flex w-1/2 mx-auto pt-5 items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                className="inline-block h-10 w-10 rounded-full"
                src="https://www.pngitem.com/pimgs/m/76-760235_hair-illustration-art-female-head-icon-png-transparent.png"
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <form onSubmit={handleSubmit} className="relative">
                <div className="overflow-hidden rounded-t-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label htmlFor="comment" className="sr-only">
                    Add your post
                  </label>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    data-cy="post-input"
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
                    <div className="flex items-center">
                      <Image
                        type="file"
                        isSent={isSent}
                        handleImageUpload={handleImageUpload}
                      />
                    </div>
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
          </div>
          <div
            className="flex flex-col justify-center content-center"
            id="feed"
            role="feed"
          >
            {[...posts].reverse().map((post) => (
              <Link to={`/posts/${post._id}`} key={post._id}>
                <Post post={post} userData={userData} />
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Feed;
