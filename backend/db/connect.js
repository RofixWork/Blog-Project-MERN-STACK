const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose.set("strictQuery", true).connect(url);
};
module.exports = connectDB;
