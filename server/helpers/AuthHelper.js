const JWT = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createToken = (user) => {
  return JWT.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
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
  validEmail,
  validPassword,
};
