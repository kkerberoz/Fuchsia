const JWT = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createToken = (user) => {
  return JWT.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token, cb) => {
  return JWT.verify(token, JWT_SECRET, function (err, decode) {
    // //console.log(decode);
    if (err) {
      cb(err);
    } else {
      cb(null, decode);
    }
  });
};

const validEmail = (email) => {
  const emailRegex = /[^@]+@[^\.]+\..+/; // eslint-disable-line
  return emailRegex.test(email);
};

const validPassword = (password) => {
  const passwordRegex = /^.{6,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  createToken,
  verifyToken,
  validEmail,
  validPassword,
};
