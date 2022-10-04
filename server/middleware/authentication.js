const { verify } = require("jsonwebtoken");
const CustomError = require("../error");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  const payload = verify(token, process.env.JWT_SECRET);
  console.log(payload);
  req.user = {
    userId: payload.userId,
    name: payload.name,
  };
  next();
};

module.exports = { authenticateUser };
