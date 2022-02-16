/* eslint-disable no-undef */
// const jwt = require("jsonwebtoken");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "NotFound") {
    return res.status(404).send({ error: "malformatted id" });
  } else if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error) {
    return res.status(400).json({ error });
  }
  next(error);
};

// const tokenExtractor = (request, response, next) => {
//   const auth = request.get("Authorization");
//   if (auth && auth.toLowerCase().startsWith("bearer ")) {
//     request.token = auth.substring(7);
//   }
//   next();
// };
// const userExtractor = async (request, response, next) => {
//   const decodedToken = jwt.verify(request.token, process.env.SECRET);
//   request.user = await User.findById(decodedToken.id);
//   next();
// };

module.exports = {
  unknownEndpoint,
  errorHandler,
  // tokenExtractor,
  // userExtractor,
};
