// requires
const BadRequest = require("../errors/BadRequest");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  userValidate,
  userRegisterValidate,
} = require("../schema/user-validate");
const Joi = require("joi");
const { findOneAndUpdate } = require("../models/User");
const { StatusCodes } = require("http-status-codes");

// requires

// register
const register = async (req, res) => {
  // validation data user
  const { error, value } = userValidate(req.body);
  // errors
  if (error) {
    throw new BadRequest(error.message);
  }

  //   check user
  const checkUser = await User.findOne({ email: { $eq: value.email } });

  if (checkUser) {
    throw new BadRequest("this Email already Exist");
  }

  //   create user
  const user = await User.create({ ...value });

  //   generate token
  const token = user.createJWT({ id: user._id, username: user.username });

  res.json({ message: "Account has been created", token });
};

// login
const login = async (req, res) => {
  const { error, value } = userRegisterValidate(req.body);

  if (error) {
    throw new BadRequest(error.message);
  }

  // check user
  const user = await User.findOne({ email: { $eq: value.email } });

  if (!user) {
    throw new BadRequest("Email or Password incorrect");
  }

  //   check password
  const isMatch = await bcrypt.compare(value.password, user.password);

  if (!isMatch) {
    throw new BadRequest("Email or Password incorrect");
  }
  // generate token
  const token = user.createJWT({ id: user._id, username: user.username });

  res.json({ message: "You have login successfully", token });
};

// update name
const updateUserName = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    _id: { $eq: id },
  });
  if (!user) {
    throw new BadRequest("ID user incorrect...");
  }

  const schema = Joi.object({
    username: Joi.string().alphanum().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    throw new BadRequest(error.message);
  }

  const post = await User.findOneAndUpdate(
    {
      _id: { $eq: id },
    },
    {
      username: value.username,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const token = post.createJWT({
    id: post._id,
    username: post.username,
  });
  res.status(StatusCodes.OK).json({
    status: true,
    token,
    message: "Your name has been Updated successfully",
  });
};

module.exports = { register, login, updateUserName };
