const express = require("express");
const {
  createPost,
  getAllPosts,
  updatePost,
  getPost,
  updatePostImage,
  getPostImage,
  deletePost,
  homePosts,
  homePost,
  createComment,
  fetchComment,
} = require("../controllers/post.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.route("/create_post").post(auth, createPost);
router.route("/posts").get(auth, getAllPosts);
router.route("/post/:id").get(auth, getPost).patch(auth, updatePost);

router
  .route("/post/edit_image/:id")
  .get(auth, getPostImage)
  .patch(auth, updatePostImage);

router.route("/delete_post/:id").delete(auth, deletePost);

router.route("/home_posts").get(homePosts);
router.route("/home_post/:id").get(homePost);
router.route("/create_comment").post(auth, createComment);
router.route("/comments/:id").get(fetchComment);

module.exports = router;
