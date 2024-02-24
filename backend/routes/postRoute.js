const express = require("express");
const {getAllPosts, createPost, updatePost, deletePost, getMyPosts} = require("../controllers/postController");
const {authorizeUser} = require("../middlewares/auth");

const router = express.Router();
//All posts
router.route("/posts").get(getAllPosts);
router.route("/post/new").post(authorizeUser,createPost);
router.route("/post/:id").put(authorizeUser,updatePost);
router.route("/post/:id").delete(authorizeUser,deletePost);
//My posts
router.route("/posts/me").get(authorizeUser,getMyPosts);
module.exports = router;