const ResHelper = require("../helpers/ResHelper");
const Review = require("../models/Review");
module.exports = {
  postReview: (req, res) => {
    const { reviewTitle, reviewContent, category, imageLink } = req.body;
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
  getReviews: (req, res) => {
    const { filter, word, sortBy, direction, offset } = req.body;

    if (!filter.localeCompare("category")) {
      if (!sortBy.localeCompare("reviewDatetime"))
        Review.find({ category: word })
          .sort({ reviewDatetime: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) =>
            ResHelper.success(res, { review: reviews, count: reviews.length })
          )
          .catch((err) => ResHelper.error(res, err));
      else if (!sortBy.localeCompare("view")) {
        Review.find({ category: word })
          .sort({ view: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) =>
            ResHelper.success(res, { review: reviews, count: reviews.length })
          )
          .catch((err) => ResHelper.error(res, err));
      }
    } else {
      if (!sortBy.localeCompare("reviewDatetime"))
        Review.find({ reviewTitle: word })
          .sort({ reviewDatetime: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) =>
            ResHelper.success(res, { review: reviews, count: reviews.length })
          )
          .catch((err) => ResHelper.error(res, err));
      else if (!sortBy.localeCompare("view")) {
        Review.find({ reviewTitle: word })
          .sort({ view: direction })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) =>
            ResHelper.success(res, { review: reviews, count: reviews.length })
          )
          .catch((err) => ResHelper.error(res, err));
      }
    }
  },
};
