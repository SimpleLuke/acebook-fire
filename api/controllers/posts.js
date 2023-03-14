const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const multer = require("multer");
const Upload = multer({ dest: "uploads/" });
const express = require("express");
const app = express();

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
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

  UploadPhoto: {
    app.post('/photos', upload.array('photos', 3), function (req, res) {
      res.send({code: 200, message: success})
    })
  }
};

module.exports = PostsController;
