const router = require("express").Router();
const { ReadingList } = require("../models");

router.post("/", async (req, res) => {
  const entry = await ReadingList.create({
    userId: req.body.userId, //req.user.id?
    blogId: req.body.blogId,
  });
  res.json(entry);
});

router.put("/:id", async (req, res) => {
  const entry = await ReadingList.findByPk(req.params.id);
  if (entry.userId.toString() === req.user.id.toString()) {
    entry.read = req.body.read;
    await entry.save();
    res.json(entry);
  } else
    res
      .status(401)
      .json({
        error: "You can only mark the blogs in their own reading list",
      })
      .end();
});

module.exports = router;
