const User = require("../models/User");
const ResHelper = require("../helpers/ResHelper");

let auth = (req, res, next) => {
  let token = req.cookies.jwt;
  console.log(token)
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    } else {
      if (!user) {
        return ResHelper.unauth(res, "You need to logged in");
      } else {
        req.token = token;
        req.user = user;

        console.log(user);
        
        next();
      }
    }
  });
};

module.exports = { auth };
