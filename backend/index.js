// requires
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const userRouter = require("./routes/user.route");
const cors = require("cors");
const postRouter = require("./routes/post.route");
// requires

// app
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// morgan
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);

// my middlewares
app.use(notFound);
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 5000;

// start
const start = async () => {
  try {
    // connect to database
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
  } catch (error) {
    console.error(error);
  }
};

start();
