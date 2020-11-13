const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const ViolentSchema = new mongoose.Schema(
  {
    reviewId:{
      type: String,
      required: true,
    },
    violentContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Violent", ViolentSchema);
