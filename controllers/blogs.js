const { Op } = require("sequelize");
const blogsRouter = require("express").Router();
const { Blog, User } = require("../models");

blogsRouter.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["username", "name"] },
    where,
    order: [["likes", "DESC"]],
  });
  // console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = await Blog.create({
    author: req.body.author,
    title: req.body.title,
    url: req.body.url,
    likes: req.body.likes,
    year: req.body.year,
    userId: req.user.id,
    date: new Date(),
  }); //=== Blog.build(req.body) && blog.save()
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogsRouter.get("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;

  // console.log(JSON.stringify(blog));
  res.json(blog);
});

blogsRouter.put("/:id", blogFinder, async (req, res) => {
  if (req.blog.userId.toString() === req.user.id.toString()) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else
    res
      .status(401)
      .json({ error: "You don't have the permission to update this blog" })
      .end();
});

blogsRouter.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog.userId.toString() === req.user.id.toString()) {
    await req.blog.destroy();
    res.sendStatus(200);
  } else {
    res
      .status(401)
      .json({ error: "You don't have the permission to delete this blog" })
      .end();
  }
});

module.exports = blogsRouter;
