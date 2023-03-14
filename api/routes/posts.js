const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/:postId", PostsController.FindById);
router.post("/photos", PostsController.UploadPhoto);

module.exports = router;
