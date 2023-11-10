const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, default: "user" },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

const Document = sequelize.define(
  "document",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    data: { type: DataTypes.TEXT },
    file: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

const Template = sequelize.define(
  "template",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    data: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

const TemplateCategory = sequelize.define(
  "template category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

User.hasMany(Document);
Document.belongsTo(User);

User.hasMany(Template);
Template.belongsTo(User);

TemplateCategory.hasMany(Template);
Template.belongsTo(TemplateCategory);

User.hasMany(TemplateCategory);
TemplateCategory.belongsTo(User);

module.exports = {
  User,
  Document,
  Template,
  TemplateCategory,
};
