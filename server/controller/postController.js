const ResHelper = require("../helpers/ResHelper");
const Review = require("../models/Review");
const Comment = require("../models/Comment");
const Favorite = require("../models/Favorite");
const Followed = require("../models/Followed");
module.exports = {
  postReview: (req, res) => {
    const { reviewTitle, reviewDescription, reviewContent, category, imageLink } = req.body;
    if (!reviewTitle) {
      return ResHelper.fail(res, "review title is required!");
    }
    if (!reviewContent) {
      return ResHelper.fail(res, "review content is required!");
    }
    if (!category) {
      return ResHelper.fail(res, "category is required!");
    }

    const newReview = Review({
      userId: req.user._id,
      reviewTitle,
      reviewDescription,
      reviewContent,
      category,
      imageLink,
    });

    newReview
      .save()
      .then(() => {
        ResHelper.success(res, {
          message: "Post successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getAllreviews: (res) => {
    Review.count()
    .then((reviews) => 
      ResHelper.success(res, reviews)
    ).catch((err) => ResHelper.error(res, err));
  },
  getReviews: (req, res) => {
    const { filter, word, sortBy, direction, offset } = req.query;
    if(filter === ""){
      Review.find()
          .sort({ "reviewDatetime": 1 })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) =>
            ResHelper.success(res, {review: reviews, count: reviews.length})
          ).catch((err) => ResHelper.error(res, err));
    }
    else if (!filter.localeCompare("category")) {
      if (!sortBy.localeCompare("reviewDatetime"))
        Review.find({ category: word })
          .sort({ reviewDatetime: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) => 
            ResHelper.success(res, {review: reviews, count: reviews.length})
          ).catch((err) => ResHelper.error(res, err));
      else if (!sortBy.localeCompare("view")) {
        Review.find({ category: word })
          .sort({ view: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) => 
            ResHelper.success(res, {review: reviews, count: reviews.length})
          ).catch((err) => ResHelper.error(res, err));
      }
    } else {
      if (!sortBy.localeCompare("reviewDatetime"))
        Review.find({ reviewTitle: {$regex: word} })
          .sort({ reviewDatetime: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) => 
            ResHelper.success(res, {review: reviews, count: reviews.length})
          ).catch((err) => ResHelper.error(res, err));
      else if (!sortBy.localeCompare("view")) {
        Review.find({ reviewTitle: {$regex: word} })
          .sort({ view: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) => 
            ResHelper.success(res, {review: reviews, count: reviews.length})
          ).catch((err) => ResHelper.error(res, err));
      }
    }
  },
  postComment: (req, res) => {
    const { reviewId, commentContent } = req.body;
    if (!reviewId) {
      return ResHelper.fail(res, "review ID is required!");
    }
    if (!commentContent) {
      return ResHelper.fail(res, "comment content is required!");
    }

    const newComment = Comment({
      reviewId,
      commentContent
    })
    newComment.save()
    .then(() => {
      ResHelper.success(res, {
        message: "Post successful!",
      });
    })
    .catch((err) => ResHelper.error(res, err));
  
  },
  getComments: (req, res) => {
    const reviewId = req.query.reviewId;
    Comment.find({"reviewId": reviewId})
    .then((comments) => ResHelper.success(res, {comment: comments, count: comments.length})
    ).catch((err) => ResHelper.error(res, err));
  },
  getFavorite: (req, res) => {
    const reviewId = req.query.reviewId; // individual user
    Favorite.find({"reviewId": reviewId})
    .then((favorites) => ResHelper.success(res, {favorite: favorites, count: favorites.length})
    ).catch((err) => ResHelper.error(res, err));
  },
  getFolloweds: (req, res) => {
    Followed.find({"userId": /* _id */res})
    .then((followeds) => ResHelper.success(res, {followed: followeds, count: followeds.length})
    ).catch((err) => ResHelper.error(res, err));
  }
};
