const Blog = require("./blog");
const ReadingList = require("./reading_list");
const User = require("./user");
const ActiveSession = require("./active_session");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(ActiveSession);
ActiveSession.belongsTo(User);

Blog.belongsToMany(User, { through: ReadingList, as: "readers" });
User.belongsToMany(Blog, { through: ReadingList, as: "readings" });

// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = { Blog, User, ReadingList, ActiveSession };
