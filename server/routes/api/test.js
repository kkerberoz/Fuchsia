const router = require("express").Router();
const User = require("../../models/User");
const ResHelper = require("../../helpers/ResHelper");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      ResHelper.success(res, {
        message: "Registration successful!",
        users,
      });
    })
    .catch((err) => ResHelper.error(res, err));
});
