const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  firstName: String,
  lastName: String,
  comments: [String]
}, { timestamps: true }, 
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;