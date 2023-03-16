const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const mongoose = require("mongoose");

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

  FindComments: (req, res) => {
    Post.findOne({ _id: req.params.postId }, async (err, post) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ comments: post.comments, token: token });
    });
  },

  AddComment: (req, res) => {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $push: { comments: req.body.newComment } },
      { returnNewDocument: true },
      async (err, post) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ message: "Comment added", token: token });
      }
    );
  },
  GetLikesByPost: (req, res) => {
    Post.findById(req.params.postId)
      .populate("likes")
      .exec((err, post) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ post: post, token: token });
      });
  },

  UpdateLikesByPost: async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(mongoose.Types.ObjectId(req.body.user_id))) {
      post.likes = post.likes.filter(
        (item) => item.toString() !== req.body.user_id
      );
    } else {
      post.likes.push(req.body.user_id);
    }

    await post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },

  CheckLikeByPost: async (req, res) => {
    let isLike;
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(mongoose.Types.ObjectId(req.body.user_id))) {
      isLike = true;
    } else {
      isLike = false;
    }
    await post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token, isLike: isLike });
    });
  },
};

module.exports = PostsController;
