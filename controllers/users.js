const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const { User, Blog } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const body = req.body;

  //check password
  if (!body.password) {
    return res.status(400).json({
      error: "User validation failed: Path `password` is required.",
    });
  }
  if (body.password.length < 3) {
    return res.status(400).json({
      error:
        "User validation failed: Path `password` is shorter than the minimum allowed length (3).",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = {
    name: body.name,
    username: body.username,
    passwordHash,
  };

  const savedUser = await User.create(user);
  res.json(savedUser);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

usersRouter.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });

  user.username = req.body.username;
  await user.save();

  res.json(user);
});

module.exports = usersRouter;
