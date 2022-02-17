const logoutRouter = require("express").Router();
const { ActiveSession } = require("../models");

logoutRouter.delete("/", async (req, res) => {
  const session = await ActiveSession.findOne({
    where: { userId: req.user.id, token: req.token },
  });
  await session.destroy();

  res.status(200).json({ message: "user sucessfully logged out" });
});

module.exports = logoutRouter;
