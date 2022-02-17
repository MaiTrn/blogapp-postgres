const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1991, msg: "Year must be larger than or equal to 1991" },
        max: {
          args: new Date().getFullYear(),
          msg: `Year must be less than or equal to ${new Date().getFullYear()}`,
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

module.exports = Blog;
