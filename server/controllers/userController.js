const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils/jwt");
const CustomError = require("../error");

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, {
    new: true,
    runValidators: true,
  });

  const userToken = { userId: user._id, name: user.name };

  attachCookiesToResponse({ res, userToken });

  res.status(StatusCodes.OK).json({ userToken });
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  const validPassword = await user.comparePasswords(oldPassword);

  if (!validPassword) {
    throw new CustomError.UnauthenticatedError("Wrong password");
  }
  user.password = newPassword;
  await user.save();

  //compare password
  //hash password again
  res.status(StatusCodes.OK).json({ msg: "Success! password updated" });
};

module.exports = { showCurrentUser, updateUser, updatePassword };
