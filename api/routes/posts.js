const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/:postId", PostsController.FindById);
router.get("/:postId/comments", PostsController.FindComments);
router.post("/:postId/comments", PostsController.AddComment);


module.exports = router;
