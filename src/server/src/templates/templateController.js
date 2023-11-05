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
}

module.exports = new templateController();
