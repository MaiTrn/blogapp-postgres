/* eslint-disable no-undef */
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const authorRouter = require("./controllers/authors");
const readinglistRouter = require("./controllers/readinglists");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readinglistRouter);
app.use("/api/logout", logoutRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
