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

const UserPersonalData = sequelize.define(
  "user personal data",
  {
    fullName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    countrySubdivision: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    adress: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    dateOfBirth: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

const UserWorkData = sequelize.define(
  "user work data",
  {
    officeAdress: { type: DataTypes.STRING },
    placeOfWork: { type: DataTypes.STRING },
    workPhoneNumber: { type: DataTypes.STRING },
    workZipCode: { type: DataTypes.STRING },
    workEmail: { type: DataTypes.STRING },
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

User.hasOne(UserPersonalData);
UserPersonalData.belongsTo(User);

User.hasOne(UserWorkData);
UserWorkData.belongsTo(User);

module.exports = {
  User,
  Document,
  Template,
  TemplateCategory,
  UserPersonalData,
  UserWorkData,
};
