const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewId:{
      type: String,
      required: true,
    },
    score: {
      type: Number,
      require: true,
    },
    favoriteDatetime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Favorite", FavoriteSchema);
