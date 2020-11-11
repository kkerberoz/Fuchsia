const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewId: {
      type: String,
      required: true,
    },
    commentContent: {
      type: String,
      required: true,
    },
    commentDatetime: {
      type: Date,
      default: Date.now(),
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Comment", CommentSchema);
