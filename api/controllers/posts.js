const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        console.log(req);
        console.log(err);
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        throw err;
      }
    });
    const post = new Post({
      message: req.body.message,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: req.file.filename,
    });
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },

  FindById: (req, res) => {
    Post.findOne({ _id: req.params.postId }, async (err, post) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ post: post, token: token });
    });
  },
};

module.exports = PostsController;
