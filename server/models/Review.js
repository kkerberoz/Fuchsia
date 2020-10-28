const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const ReviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    review_content: {
      type: String,
      required: true,
    },
    review_datetime: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["NORMAL", "BAN"],
      default: "NORMAL",
      required: true,
    },
    view: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", function (next) {
//   this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12));
//   next();
// });

// UserSchema.methods.isValidPassword = function (newPassword) {
//   return bcrypt.compareSync(newPassword, this.password);
// };

module.exports = mongoose.model("Review", ReviewSchema);
