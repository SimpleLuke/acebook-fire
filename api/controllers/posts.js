const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  FindById: (req, res) => {

    Post.findOne({_id: req.params.postId}, async (err, post) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ post: post, token: token });
    });
  },

  GetLikesByPost: (req, res) => {
    console.log("LOGGGGG",req.params.postId)
    Post.findById(req.params.postId)
      .populate('likes')
      .exec((err, post) => {
        if (err) {
          throw err;
        }
        const token =  TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ post: post, token: token });
      });
      
  }
};

module.exports = PostsController;
