const jwt = require("jsonwebtoken");
const { User, ActiveSession } = require("../models");
const { SECRET } = require("./config");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "NotFound") {
    return res.status(404).send({ error: `Data not found` });
  } else if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }
  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const auth = req.get("Authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.substring(7);
    const session = await ActiveSession.findOne({
      where: { token },
    });
    console.log(session);
    if (session) {
      req.token = token;
    } else res.status(401).json({ error: "token expired" });
  }
  next();
};
const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, SECRET);
  req.user = await User.findByPk(decodedToken.id);
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
