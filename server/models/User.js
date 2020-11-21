const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
// const { ObjectId } = require("mongodb");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    dob: {
      type: Date,
      required: true,
    },
    tel: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BAN"],
      default: "ACTIVE",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MANAGER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12));
  next();
});

UserSchema.methods.isValidPassword = function (newPassword) {
  return bcrypt.compareSync(newPassword, this.password);
};

UserSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // console.log("HERE",token);
  jwt.verify(token, JWT_SECRET, function (err, decode) {
    // console.log(decode);
    user.findOne({ _id: decode.userId }, function (err, user) {
      if (err) {
        return cb(err);
      } else {
        // console.log("!!",user);
        cb(null, user);
      }
    });
  });
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
};

module.exports = mongoose.model("User", UserSchema);
