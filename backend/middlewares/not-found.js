const { StatusCodes } = require("http-status-codes");
const notFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    status: false,
    message: "this Route does not found",
  });
};
module.exports = notFound;
