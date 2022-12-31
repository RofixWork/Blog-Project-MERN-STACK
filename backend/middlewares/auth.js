const BadRequest = require("../errors/BadRequest");
const CustomError = require("../errors/CustomError");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //   check auth haeder
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequest("not token provided!");
  }

  try {
    const token = authHeader.split(/\s/).at(1);
    const { id, username } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomError("Unauthorized!", StatusCodes.UNAUTHORIZED);
  }
};

module.exports = auth;
