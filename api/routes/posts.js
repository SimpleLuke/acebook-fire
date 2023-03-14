const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", upload.array("image", 3), PostsController.Create);
router.get("/:postId", PostsController.FindById);

module.exports = router;
