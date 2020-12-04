const User = require("../models/User");
const ResHelper = require("../helpers/ResHelper");
const AuthHelper = require("../helpers/AuthHelper");

module.exports = {
  register: (req, res) => {
    // //console.log(req.body.email);
    const { username, firstName, lastName, password, dob, tel } = req.body;
    const email = req.body.email ? req.body.email.toLowerCase() : undefined;

    // Validation
    if (!username) {
      return ResHelper.fail(res, "Username is required");
    }
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
        if (users != null) {
          return ResHelper.fail(
            res,
            "An account with this email already exists"
          );
        }
        // Save user
        const newUser = User({
          username,
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
      return ResHelper.fail(
        res,
        "You have entered an invalid email or password"
      );
    }

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return ResHelper.fail(
            res,
            "You have entered an invalid email or password"
          );
        } else if (user.status === "BAN") {
          return ResHelper.fail(res, "You have banned from Fuchsia !!!!!!!");
        }

        if (user.isValidPassword(password)) {
          const token = AuthHelper.createToken(user);
          const role = user.role;
          ResHelper.success(res, { message: "Login successful!", token, role });
        } else {
          ResHelper.fail(res, "You have entered an invalid email or password");
        }
      })
      .catch((err) => ResHelper.error(res, err));
  },
  checkLogin: (req, res, next) => {
    const token = req.query.token;
    if (!token) {
      ResHelper.fail(res, "Invalid token");
    }
    AuthHelper.verifyToken(token, (err, decode) => {
      if (err) {
        ResHelper.error(res, err);
      } else {
        if (!decode) {
          return ResHelper.unauth(res, "You need to logged in");
        } else {
          ResHelper.success(res, { decode });
          next();
        }
      }
    });
  },
  getUser: (req, res) => {
    const id_user = req.user._id;
    User.findOne({ _id: id_user })
      .then((user) => {
        if (!user) {
          return ResHelper.fail(res, "No user found with that email");
        } else {
          const data = {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastname: user.lastName,
            email: user.email,
            dob: user.dob,
            tel: user.tel,
          };
          return ResHelper.success(res, data);
        }
      })
      .catch((err) => ResHelper.error(res, err));
  },
  getUserById: (req, res) => {
    // //console.log("HEHE",req.query)
    const userId = req.query.userId;
    User.findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          return ResHelper.fail(res, "No user found with that email");
        } else {
          const data = {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastname: user.lastName,
            email: user.email,
            dob: user.dob,
            tel: user.tel,
          };
          return ResHelper.success(res, data);
        }
      })
      .catch((err) => ResHelper.error(res, err));
  },
};
