const {
  Template,
  TemplateCategory,
  TemplateFields,
  UserPersonalData,
  UserWorkData,
  User,
} = require("../../models/models");
const { Op } = require("sequelize");
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
    const { title, data, category, fields } = req.body;
    const token = req.get("Bearer");
    const userId = req.body.userId ?? jwt.verify(token, jwtKey()).id;
    const date = new Date();
    const admins = await User.findAll({
      attributes: ["id"],
      where: { role: "admin" },
    });
    const adminIdsArray = admins.map((admin) => admin.id);
    const [result, created] = await TemplateCategory.findOrCreate({
      where: {
        name: category,
        userId: {
          [Op.or]: [userId, ...adminIdsArray],
        },
      },
      defaults: { name: category, description: "", userId: userId },
    });
    const categoryId = result.id;
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
      res.status(200).send({
        template: {
          ...template.dataValues,
          picture: "/src/client/assets/icons/documents/icon-template.svg",
          link: `document?templateId=${template.id}`,
        },
        message: "Template saved",
      });
    });
  }

  async getAllTemplates(req, res) {
    const admins = await User.findAll({
      attributes: ["id"],
      where: { role: "admin" },
    });
    const adminIdsArray = admins.map((admin) => admin.id);
    const categories = await TemplateCategory.findAll({
      where: {
        userId: {
          [Op.or]: [req.user.id, ...adminIdsArray],
        },
      },
      include: [Template],
    });
    if (categories === undefined)
      return res.status(400).send("Templates not found");
    else {
      const result = categories.map((category) => {
        return {
          id: category.id,
          title: category.name,
          templates: category.templates
            .filter((template) => {
              return (
                adminIdsArray.includes(template.userId) ||
                template.userId === req.user.id
              );
            })
            .map((template) => {
              return {
                ...template.dataValues,
                picture: "/src/client/assets/icons/documents/icon-template.svg",
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
    const admins = await User.findAll({
      attributes: ["id"],
      where: { role: "admin" },
    });
    const adminIdsArray = admins.map((admin) => admin.id);
    await Template.findAndCountAll({
      where: {
        userId: {
          [Op.or]: [req.user.id, ...adminIdsArray],
        },
      },
      limit: 4,
    })
      .then((result) => {
        res.status(200).send({
          templates: result.rows.map((template) => {
            return {
              ...template.dataValues,
              picture: "/src/client/assets/icons/documents/icon-template.svg",
              link: `document?templateId=${template.id}`,
            };
          }),
          messege: "Templates found",
        });
      })
      .catch((error) => {
        return res.status(400).send({ message: error });
      });
  }

  async getTemplate(req, res) {
    const templateId = req.body.templateId;
    const userId = req.user.id;
    const template = await Template.findByPk(templateId);
    let fieldsNames;
    TemplateFields.findAll({
      where: { templateId: template.id },
    })
      .then((fields) => {
        fieldsNames = fields.map((field) => {
          return field.name;
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
    const userPersonalData = await UserPersonalData.findOne({
      where: { userId: userId },
    });
    const userWorkData = await UserWorkData.findOne({
      where: { userId: userId },
    });
    const fieldsValues = {};
    fieldsNames?.forEach((field) => {
      const fieldName = camelize(field);
      if (userPersonalData?.[fieldName])
        fieldsValues[field] = userPersonalData[fieldName];
      else if (userWorkData?.[fieldName])
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

  async renameTemplate(req, res) {
    const { templateId, title } = req.body;
    console.log(templateId, title);
    Template.update({ title: title }, { where: { id: templateId } })
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).send({
            message: "Template name changed",
          });
        } else res.status(400).send({ message: "Template not found" });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  }

  async deleteTemplate(req, res) {
    const { templateId } = req.body;
    await Template.destroy({ where: { id: templateId } })
      .then((result) => {
        console.log(result);
        res.status(200).send({
          message: "Template deleted",
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  }

  async renameTemplateCategory(req, res) {
    const { categoryId, name } = req.body;
    const userId = req.user.id;
    TemplateCategory.update(
      { name: name },
      { where: { id: categoryId /*userId: userId*/ } }
    )
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).send({
            message: "Category name changed",
          });
        } else res.status(400).send({ message: "Category not found" });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  }

  async deleteTemplateCategory(req, res) {
    const { categoryId } = req.body;
    const userId = req.user.id;
    await TemplateCategory.destroy({
      where: { id: categoryId /*userId: userId*/ },
    })
      .then((result) => {
        res.status(200).send({
          message: "Category deleted",
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  }

  async getTemplateCategories(req, res) {
    const userId = req.user.id;
    console.log(userId);
    const admins = await User.findAll({
      attributes: ["id"],
      where: { role: "admin" },
    });
    const adminIdsArray = admins.map((admin) => admin.id);
    const categories = await TemplateCategory.findAll({
      where: {
        userId: {
          [Op.or]: [userId, ...adminIdsArray],
        },
      },
    });
    if (categories === undefined)
      return res.status(400).send("Templates not found");
    else {
      const result = categories.map((category) => {
        return category.name;
      });
      res.status(200).send({
        categories: result,
        messege: "Templates found",
      });
    }
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
