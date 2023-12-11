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

const TemplateFields = sequelize.define(
  "template fields",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
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

const Application = sequelize.define(
  "application",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

const ApplicationData = sequelize.define(
  "application data",
  {
    category: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    fileRoute: { type: DataTypes.STRING },
    comment: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

const ApplicationStatus = sequelize.define(
  "application status",
  {
    userId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    comment: { type: DataTypes.TEXT },
    timeOfChange: { type: DataTypes.DATE },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

User.hasMany(Document, { onDelete: "CASCADE" });
Document.belongsTo(User);

User.hasMany(Template, { onDelete: "CASCADE" });
Template.belongsTo(User);

TemplateCategory.hasMany(Template, { onDelete: "CASCADE" });
Template.belongsTo(TemplateCategory);

Template.hasMany(TemplateFields, { onDelete: "CASCADE" });
TemplateFields.belongsTo(Template);

User.hasMany(TemplateCategory, { onDelete: "CASCADE" });
TemplateCategory.belongsTo(User);

User.hasOne(UserPersonalData, { onDelete: "CASCADE" });
UserPersonalData.belongsTo(User);

User.hasOne(UserWorkData, { onDelete: "CASCADE" });
UserWorkData.belongsTo(User);

User.hasMany(Application, { onDelete: "CASCADE" });
Application.belongsTo(User);

Application.hasOne(ApplicationData, { onDelete: "CASCADE" });
ApplicationData.belongsTo(Application);

Application.hasMany(ApplicationStatus, { onDelete: "CASCADE" });
ApplicationStatus.belongsTo(Application);

module.exports = {
  User,
  Document,
  Template,
  TemplateCategory,
  TemplateFields,
  UserPersonalData,
  UserWorkData,
  Application,
  ApplicationData,
  ApplicationStatus,
};
