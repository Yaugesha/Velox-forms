const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  emai: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, default: "user" },
});

const Document = sequelize.define("document", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  data: { type: DataTypes.STRING },
  file: { type: DataTypes.BLOB },
});

const Template = sequelize.define("template", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  data: { type: DataTypes.STRING },
});

User.hasMany(Document);
Document.belongsTo(User);

User.hasMany(Template);
Template.belongsTo(User);

module.exports = {
  User,
  Document,
  Template,
};
