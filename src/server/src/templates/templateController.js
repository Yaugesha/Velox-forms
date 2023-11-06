const { Template, TemplateCategory } = require("../../models/models");
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
    const { token, title, data, category } = req.body;
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
    }).then(() => {
      console.log("template saved");
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
        res
          .status(200)
          .send({ templates: result.rows, messege: "Templates found" });
      })
      .catch((error) => {
        return res.status(400).send("Templates not found");
      });
  }
}

module.exports = new templateController();
