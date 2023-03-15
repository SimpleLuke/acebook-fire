const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const mongoose = require("mongoose");

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
    // console.log("LOGGGGG",req.params.postId)
    Post.findById(req.params.postId)
      .populate('likes')
      .exec((err, post) => {
        if (err) {
          throw err;
        }
        const token =  TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ post: post, token: token });
      });
  },

  UpdateLikesByPost: async(req,res)=>{
    console.log('Backend',req)
    const post = await Post.findById(req.params.postId);
    console.log('Post like:',post.likes)
    console.log('Post like type:',typeof post.likes[0])
    //console.log('Post like:', post.likes[0]['oid'])
    console.log('User_id',req.body.user_id)
    console.log('User_id type',typeof req.body.user_id)
    console.log('Compare',post.likes.includes(req.body.user_id))
    console.log('Compare2',post.likes.findIndex(user_id => user_id === req.body.user_id))
    if (post.likes.includes(mongoose.Types.ObjectId(req.body.user_id))) {
      // post.likes = post.likes.filter(item => item !== mongoose.Types.ObjectId(req.body.user_id))
      post.likes = post.likes.filter(item => item.toString() !== req.body.user_id)
    } else {
      post.likes.push(req.body.user_id)
    }
    // if(post.likes.findIndex(user_id => user_id === req.body.user_id) === -1){
    //   post.likes.push(req.body.user_id)
    // }
    

    await post.save( (err) => {
      if (err) {
        throw err;
      }

      const token =  TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  }
};

module.exports = PostsController;
