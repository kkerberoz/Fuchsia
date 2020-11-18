const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
//Controllers
const PostController = require("../controller/postController");

//Routes
router.post("/postreview", auth, PostController.postReview);
router.get("/getreview", PostController.getReviews);
router.get("/deletereview", PostController.deleteReview);
router.get("/getreviewscount", PostController.getReviewsCount);
router.get("/getreviewinfo", PostController.getReviewInfo);
// router.post("/postcomment", auth, PostController.postComment);
// router.get("/getcomment", PostController.getComments);
// router.get("/getfollowed", PostController.getFolloweds);
// router.get("/getfavorite", PostController.getFavorite);
router.get("/violentregconition", PostController.violentRegconition);


module.exports = router;
