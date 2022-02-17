const authorRouter = require("express").Router();
const { Blog } = require("../models");
const { sequelize } = require("../utils/db");

authorRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
  });

  res.json(blogs);
});

module.exports = authorRouter;
