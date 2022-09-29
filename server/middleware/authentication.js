const { verify } = require("jsonwebtoken");
const CustomError = require("../error");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Invalid user");
  }
  const payload = verify(token, process.env.JWT_SECRET);
  req.user = {
    userId: payload.userId,
    name: payload.name,
  };
  next();
};

module.exports = { authenticateUser };
