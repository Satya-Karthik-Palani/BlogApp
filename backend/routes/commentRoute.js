const express = require("express");
const {authorizeUser} = require("../middlewares/auth");
const { createComment, getPostComments } = require("../controllers/commentController");

const router = express.Router();

router.route("/comment/new").post(authorizeUser,createComment);
router.route("/comments/:id").get(authorizeUser,getPostComments)

module.exports = router;