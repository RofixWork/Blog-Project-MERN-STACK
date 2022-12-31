const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/CustomError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      status: false,
      message: err.message,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: false,
    message: err.message,
  });
};
module.exports = errorHandler;
