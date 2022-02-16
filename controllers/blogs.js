/* eslint-disable no-undef */
const blogsRouter = require("express").Router();
const { Blog } = require("../models");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  // console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
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
  const blog = req.blog;

  blog.likes = req.body.likes;
  await blog.save();
  res.json(blog);
});

blogsRouter.delete("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;

  await blog.destroy();
  res.sendStatus(200);
});

module.exports = blogsRouter;
