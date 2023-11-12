const {
  Template,
  TemplateCategory,
  TemplateFields,
  UserPersonalData,
  UserWorkData,
} = require("../../models/models");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const jwtKey = () => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
  const jwtKey = result.parsed.JWT_SECRETE_KEY;
  return jwtKey;
};

class templateController {
  async saveTemplate(req, res) {
    const { token, title, data, category, fields } = req.body;
    const userId = jwt.verify(token, jwtKey()).id;
    const date = new Date();
    const [result, created] = await TemplateCategory.findOrCreate({
      where: { userId: userId, name: category },
      defaults: { name: category, description: "", userId: userId },
    });
    const categoryId = result.id;
    console.log(result, result.id, categoryId);
    await Template.create({
      title: title,
      date: date,
      data: data,
      userId: userId,
      templateCategoryId: categoryId,
    }).then((template) => {
      console.log("template saved");
      fields.forEach((field) => {
        TemplateFields.create({
          name: field,
          templateId: template.id,
        });
      });
      res.status(200).send({ messege: "Template saved" });
    });
  }

  async getAllTemplates(req, res) {
    const token = req.body.jwt;
    console.log(token);
    const userId = jwt.verify(token, jwtKey()).id;
    const categories = await TemplateCategory.findAll({
      where: { userId: userId },
      include: [Template],
    });
    if (categories === undefined)
      return res.status(400).send("Templates not found");
    else {
      const result = categories.map((category) => {
        return {
          category: category.name,
          templates: category.templates.map((template) => {
            return {
              title: template.title,
              picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
              link: `document?templateId=${template.id}`,
            };
          }),
        };
      });
      res.status(200).send({
        templates: result,
        messege: "Templates found",
      });
    }
  }

  async getRecentTemplates(req, res) {
    const token = req.body.jwt;
    console.log(token);
    const userId = jwt.verify(token, jwtKey()).id;
    await Template.findAndCountAll({
      where: { userId: userId },
      limit: 4,
    })
      .then((result) => {
        res.status(200).send({
          templates: result.rows.map((template) => {
            return {
              title: template.title,
              picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
              link: `document?templateId=${template.id}`,
            };
          }),
          messege: "Templates found",
        });
      })
      .catch((error) => {
        return res.status(400).send("Templates not found");
      });
  }

  async getTemplayte(req, res) {
    const templateId = req.body.templateId;
    const userId = req.user.id;
    const template = await Template.findByPk(templateId);
    let fieldsNames;
    TemplateFields.findAll({
      where: { templateId: template.id },
    }).then((fields) => {
      fieldsNames = fields.map((field) => {
        return field.name;
      });
    });
    const userPersonalData = await UserPersonalData.findOne({
      where: { userId: userId },
    });
    const userWorkData = await UserWorkData.findOne({
      where: { userId: userId },
    });
    const fieldsValues = {};
    fieldsNames.forEach((field) => {
      const fieldName = camelize(field);
      console.log(fieldName);
      if (userPersonalData[fieldName])
        fieldsValues[field] = userPersonalData[fieldName];
      else if (userWorkData[fieldName])
        fieldsValues[field] = userWorkData[fieldName];
      else fieldsValues[field] = field;
    });
    if (template)
      res.status(200).send({
        layout: template.data,
        fieldsValues: fieldsValues,
        messege: "Layout found",
      });
    else res.status(400).send("Layout not found");
  }
}

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

module.exports = new templateController();
