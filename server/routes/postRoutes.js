const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
//Controllers
const PostController = require("../controller/postController");

//Routes
router.post("/postreview", auth, PostController.postReview);
router.get("/getreview", PostController.getReviews);
// router.post("/postcomment", auth, PostController.postComment);
// router.post("/getcomment", PostController.getComments);
// router.post("/getfollowed", PostController.getFolloweds);
// router.post("/getfavorite", PostController.getFavorite);


module.exports = router;
