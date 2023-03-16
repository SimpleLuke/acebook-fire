const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/:postId", PostsController.FindById);
router.get("/:postId/likes", PostsController.GetLikesByPost);
router.post("/:postId/likes", PostsController.UpdateLikesByPost);
router.post("/:postId/userLike", PostsController.CheckLikeByPost);

module.exports = router;