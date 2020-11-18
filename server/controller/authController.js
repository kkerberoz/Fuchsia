const User = require("../models/User");
const ResHelper = require("../helpers/ResHelper");
const AuthHelper = require("../helpers/AuthHelper");

module.exports = {
  register: (req, res) => {
    const { firstName, lastName, password, dob, tel } = req.body;
    const email = req.body.email ? req.body.email.toLowerCase() : undefined;

    // Validation
    if (!firstName) {
      return ResHelper.fail(res, "First Name is required");
    }
    if (!lastName) {
      return ResHelper.fail(res, "Last Name is required");
    }
    if (!email || !AuthHelper.validEmail(email)) {
      return ResHelper.fail(res, "Valid email is required");
    }
    if (!password || !AuthHelper.validPassword(password)) {
      return ResHelper.fail(res, "Password must be at least 6 characters");
    }
    if (!dob) {
      return ResHelper.fail(res, "Date of birth is required");
    }
    if (!tel) {
      return ResHelper.fail(res, "Telephone is required");
    }

    User.find({ email })
      .then((users) => {
        // Check if email is taken
        if (users.length) {
          return ResHelper.fail(
            res,
            "An account with this email already exists"
          );
        }

        // Save user
        const newUser = User({
          firstName,
          lastName,
          email,
          password,
          dob,
          tel,
        });
        newUser
          .save()
          .then((user) => {
            const token = AuthHelper.createToken(user);
            ResHelper.success(res, {
              message: "Registration successful!",
              token,
            });
          })
          .catch((err) => ResHelper.error(res, err));
      })
      .catch((err) => ResHelper.error(res, err));
  },
  login: (req, res) => {
    const password = req.body.password;
    const email = req.body.email ? req.body.email.toLowerCase() : undefined;

    if (!email || !AuthHelper.validEmail(email)) {
      return ResHelper.fail(res, "Please enter a valid email address");
    }

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return ResHelper.fail(res, "No user found with that email");
        }

        if (user.isValidPassword(password)) {
          const token = AuthHelper.createToken(user);
          const role = user.role;
          ResHelper.success(res, { message: "Login successful!", token, role });
        } else {
          ResHelper.fail(res, "Wrong password");
        }
      })
      .catch((err) => ResHelper.error(res, err));
  },
};
