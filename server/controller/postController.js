const ResHelper = require("../helpers/ResHelper");
const Review = require("../models/Review");
const Comment = require("../models/Comment");
const Favorite = require("../models/Favorite");
const Followed = require("../models/Followed");
const violent = require("../violent.json");
const Violent = require("../models/Violent");
const User = require("../models/User");
const Report = require("../models/Report");
module.exports = {
  // for review
  postReview: (req, res) => {
    const {
      reviewTitle,
      reviewDescription,
      reviewContent,
      category,
      imageLink,
    } = req.body;
    if (!reviewTitle) {
      return ResHelper.fail(res, "review title is required!");
    }
    if (!reviewContent) {
      return ResHelper.fail(res, "review content is required!");
    }
    if (!category) {
      return ResHelper.fail(res, "category is required!");
    }
    var status,
      allViolent = violentRegconition(
        reviewTitle,
        reviewDescription,
        reviewContent
      );
    if (allViolent.length) {
      status = "ALERT";
    } else status = "NORMAL";
    const newReview = Review({
      userId: req.user._id,
      reviewTitle,
      reviewDescription,
      reviewContent,
      category,
      status,
      imageLink,
    });

    newReview
      .save()
      .then((review) => {
        if (allViolent.length) {
          const newViolent = Violent({
            reviewId: review._id,
            violentContent: allViolent,
          });
          newViolent
            .save()
            .then((violent) => {
              ResHelper.success(res, {
                message: "Post with violent!! successful!",
                review,
                violent,
              });
            })
            .catch((err) => ResHelper.error(res, err));
        }
        ResHelper.success(res, {
          message: "Post without violent successful!",
          review,
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getReviewsCount: (req, res) => {
    Review.countDocuments({ $or: [{ status: "NORMAL" }, { status: "ALERT" }] })
      .then((reviews) => {
        ResHelper.success(res, reviews);
      })
      .catch((err) => {
        ResHelper.error(res, err);
      });
  },
  getReviews: (req, res) => {
    const { filter, word, category, sortBy, direction, offset } = req.query;
    ////console.log(filter);

    //no category
    if (filter === "") {
      // All review
      if (word === "") {
        Review.find({ $or: [{ status: "NORMAL" }, { status: "ALERT" }] })
          .sort({ reviewDatetime: -1 })
          .limit(20)
          .skip(20 * (offset - 1))
          .then((reviews) => {
            ResHelper.success(res, { review: reviews, count: reviews.length });
          })
          .catch((err) => ResHelper.error(res, err));
      }
      // search review & no category
      else {
        if (!sortBy.localeCompare("reviewDatetime"))
          Review.find({
            reviewTitle: { $regex: new RegExp(word, "i") },
            status: "NORMAL",
          })
            .sort({ reviewDatetime: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        else if (!sortBy.localeCompare("view")) {
          Review.find({
            reviewTitle: { $regex: new RegExp(word, "i") },
            status: "NORMAL",
          })
            .sort({ view: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        }
      }
    }
    //category
    else if (filter === "category") {
      if (word === "") {
        if (!sortBy.localeCompare("reviewDatetime"))
          Review.find({ category: category, status: "NORMAL" })
            .sort({ reviewDatetime: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        else if (!sortBy.localeCompare("view")) {
          Review.find({ category: category, status: "NORMAL" })
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
          Review.find({
            category: category,
            reviewTitle: { $regex: new RegExp(word, "i") },
            status: "NORMAL",
          })
            .sort({ reviewDatetime: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        else if (!sortBy.localeCompare("view")) {
          Review.find({
            category: category,
            reviewTitle: { $regex: new RegExp(word, "i") },
            status: "NORMAL",
          })
            .sort({ view: direction })
            .limit(20)
            .skip(20 * (offset - 1))
            .then((reviews) =>
              ResHelper.success(res, { review: reviews, count: reviews.length })
            )
            .catch((err) => ResHelper.error(res, err));
        }
      }
    }
  },
  getReviewInfo: (req, res) => {
    const reviewId = req.query.reviewId;
    Review.findOne({ _id: reviewId })
      .then((reviews) => {
        //console.log(reviews.userId);
        User.findOne({ _id: reviews.userId }, { _id: 0, username: 1 })
          .then((users) => {
            ResHelper.success(res, { reviewInfo: reviews, userInfo: users });
          })
          .catch((err) => ResHelper.error(res, err));
      })
      .catch((err) => ResHelper.error(res, err));
  },
  deleteReview: (req, res) => {
    const reviewId = req.body.reviewId;
    Review.deleteOne({ _id: reviewId })
      .then((reviews) => {
        Comment.deleteMany({ reviewId: reviewId })
          .then((comments) =>
            ResHelper.success(res, { review: reviews, comment: comments })
          )
          .catch((err) => ResHelper.error(res, err));

        Violent.deleteOne({ reviewId: reviewId })
          .then((violent) =>
            ResHelper.success(res, { review: reviews, comment: violent })
          )
          .catch((err) => ResHelper.error(res, err));
      })
      .catch((err) => ResHelper.error(res, err));
  },
  deleteComment: (req, res) => {
    const commentId = req.body.commentId;
    Comment.deleteOne({ _id: commentId })
      .then((comments) => ResHelper.success(res, { comment: comments }))
      .catch((err) => ResHelper.error(res, err));
  },
  // ---------- //
  postComment: (req, res) => {
    const { reviewId, commentContent } = req.body;
    if (!reviewId) {
      return ResHelper.fail(res, "review ID is required!");
    }
    if (!commentContent) {
      return ResHelper.fail(res, "comment content is required!");
    }
    //console.log(req.user);
    const newComment = Comment({
      userId: req.user._id,
      reviewId,
      commentContent,
    });
    newComment
      .save()
      .then(() => {
        ResHelper.success(res, {
          message: "Post successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getComments: (req, res) => {
    const reviewId = req.query.reviewId;
    // //console.log("HERE", reviewId);
    Comment.find({ reviewId: reviewId })
      .then((comments) =>
        ResHelper.success(res, { comment: comments, count: comments.length })
      )
      .catch((err) => ResHelper.error(res, err));
  },
  // favorite
  postFavorite: (req, res) => {
    const { reviewId, score } = req.body;
    // console.log(req.body);
    if (!reviewId) {
      return ResHelper.fail(res, "review ID is required!");
    }
    if (isNaN(score)) {
      return ResHelper.fail(res, "score is required!");
    }
    Favorite.findOne({ userId: req.user._id, reviewId: reviewId }).then(
      (favorites) => {
        console.log("favorite", favorites);
        if (favorites != null) {
          Favorite.findOneAndUpdate(
            { _id: favorites._id },
            { $set: { score: score, favoriteDatetime: new Date() } }
          )
            .then((res) => {
              res.json({
                status: 200,
                data: res,
              });
            })
            .catch((err) => {
              res.json({
                status: 404,
                err: err,
              });
            });
        } else {
          const newFavorite = Favorite({
            userId: req.user._id,
            reviewId,
            score,
          });
          // console.log(newFavorite)
          newFavorite
            .save()
            .then((res) => {
              res.json({
                status: 200,
                data: res,
              });
            })
            .catch((err) => {
              res.json({
                status: 404,
                err: err,
              });
            });
        }
      }
    );
  },
  getFavorite: (req, res) => {
    const reviewId = req.query.reviewId;
    Favorite.find({ _id: reviewId })
      .then((favorites) =>
        ResHelper.success(res, { favorite: favorites, count: favorites.length })
      )
      .catch((err) => ResHelper.error(res, err));
  },
  getFavoriteScore: (req, res) => {
    const { userId, reviewId } = req.query;
    // //console.log(req.query)
    Favorite.findOne(
      { userId: userId, reviewId: reviewId },
      { _id: 0, score: 1 }
    )
      .then((favorites) => ResHelper.success(res, { favoriteScore: favorites }))
      .catch((err) => ResHelper.error(res, err));
  },
  // --------- //
  getFolloweds: (req, res) => {
    Followed.find({ userId: req.user._id })
      .then((followeds) =>
        ResHelper.success(res, { followed: followeds, count: followeds.length })
      )
      .catch((err) => ResHelper.error(res, err));
  },
  postReport: (req, res) => {
    const { reviewId, reportReason } = req.body;
    if (!reviewId) {
      return ResHelper.fail(res, "review ID is required!");
    }
    if (!reportReason) {
      return ResHelper.fail(res, "report reason is required!");
    }
    const newReport = Report({
      reviewId,
      userId: req.user._id,
      reportReason,
    });
    newReport
      .save()
      .then(() => {
        ResHelper.success(res, {
          message: "Post successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  // for manager
  getReport: (req, res) => {
    var allReports = [];
    Report.find()
      .sort({ reportDatetime: -1 })
      .then(async (reports) => {
        for (var i = 0; i < reports.length; ++i) {
          try {
            const user = await User.findOne(
              { _id: reports[i].userId },
              { username: 1 }
            );
            allReports.push({ reportInfo: reports[i], userInfo: user });
          } catch (err) {
            ResHelper.error(res, err);
          }
        }
        ResHelper.success(res, allReports);
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getViolentRegconition: (req, res) => {
    var violentDetails = [];
    Violent.find()
      .then(async (violents) => {
        for (var i = 0; i < violents.length; ++i) {
          try {
            const reviews = await Review.find(
              { _id: violents[i].reviewId },
              {
                _id: 0,
                reviewTitle: 1,
                category: 1,
                reviewDatetime: 1,
                userId: 1,
              }
            );
            if (reviews.length != 0) {
              const users = await User.find(
                { _id: reviews[0].userId },
                { _id: 0, username: 1 }
              );
              violentDetails.push({
                userDetails: users,
                reviewDetails: reviews[0],
                violentContent: violents[i],
              });
            }
          } catch (err) {
            ResHelper.error(res, err);
          }
        }
        ResHelper.success(res, violentDetails);
      })
      .catch((err) => ResHelper.error(res, err));
  },
  actionViolent: async (req, res) => {
    const { action, reviewId, violentId } = req.body;
    if (!action.toLowerCase().localeCompare("accept")) {
      try {
        await Review.updateOne(
          { _id: reviewId },
          { $set: { status: "NORMAL" } }
        );
      } catch (err) {
        ResHelper.error(res, err);
      }
    } else if (!action.toLowerCase().localeCompare("decline")) {
      try {
        await Review.updateOne({ _id: reviewId }, { $set: { status: "BAN" } });
      } catch (err) {
        ResHelper.error(res, err);
      }
    }
    Violent.deleteOne({ _id: violentId })
      .then(() => {
        ResHelper.success(res, {
          message: "successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  // -------- //
  // for admin
  getReviwer: (req, res) => {
    const { name } = req.query;
    var allUser = User.find({
      firstName: { $regex: new RegExp("^" + name, "i") },
    });
    ResHelper.success(res, {
      message: "successful!",
      allUser,
    });
  },
  banUser: (req, res) => {
    const userId = req.body.userId;
    //console.log(userId);
    User.updateOne({ _id: userId }, { $set: { status: "BAN" } })
      .then(() => {
        ResHelper.success(res, {
          message: "successful!",
        });
      })
      .catch((err) => ResHelper.error(res, err));
  },
  banReview: (req, res) => {
    const reviewId = req.body.reviewId;
    const reportId = req.body.reportId;
    //console.log("!!", reportId);
    Review.updateOne({ _id: reviewId }, { $set: { status: "BAN" } })
      .then(() => {
        Report.deleteOne({ _id: reportId })
          .then((reports) => ResHelper.success(res, { report: reports }))
          .catch((err) => ResHelper.error(res, err));
      })
      .catch((err) => ResHelper.error(res, err));
  },
  // ------- //
  // for dasdboard //
  getViolentPendingCount: (req, res) => {
    Violent.countDocuments()
      .then((violents) => {
        ResHelper.success(res, violents);
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getUsersCountLastMonth: (req, res) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    User.countDocuments({ createdAt: { $gte: lastMonth }, role: "USER" })
      .then((users) => {
        ResHelper.success(res, users);
      })
      .catch((err) => ResHelper.error(res, err));
  },
};

function violentRegconition(reviewTitle, reviewDescription, reviewContent) {
  var i,
    allViolent = [];
  var thaiTitleCheck, thaiDescriptionCheck, thaiContentCheck;
  var engTitleCheck, engDescriptionCheck, engContentCheck;
  for (i = 0; i < violent.Thai.word.length; i++) {
    var thaiWord = violent.Thai.word[i];
    thaiTitleCheck = reviewTitle.toLowerCase().includes(thaiWord);
    thaiDescriptionCheck = reviewDescription.toLowerCase().includes(thaiWord);
    thaiContentCheck = reviewContent.toLowerCase().includes(thaiWord);
    if (thaiTitleCheck || thaiDescriptionCheck || thaiContentCheck) {
      allViolent.push(thaiWord);
    }
  }
  for (i = 0; i < violent.English.word.length; i++) {
    var engWord = violent.English.word[i];
    engTitleCheck = reviewTitle.toLowerCase().includes(engWord);
    engDescriptionCheck = reviewDescription.toLowerCase().includes(engWord);
    engContentCheck = reviewContent.toLowerCase().includes(engWord);
    if (engTitleCheck || engDescriptionCheck || engContentCheck) {
      allViolent.push(engWord);
    }
  }
  return allViolent;
}
