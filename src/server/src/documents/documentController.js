const { Document } = require("../../models/models");

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

class documentController {
  async saveDocument(req, res) {
    const { token, title, data, file } = req.body;
    const userId = jwt.verify(token, jwtKey()).id;
    const date = new Date();

    await Document.create({
      title: title,
      date: date,
      data: data,
      userId: userId,
      file: file,
    }).then(() => {
      console.log("document saved");
      res.status(200).send({
        file: file,
        messege: "Document saved",
      });
    });
  }

  async getAllDocuments(req, res) {
    const token = req.body.jwt;
    const userId = jwt.verify(token, jwtKey()).id;
    const dateOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const documents = await Document.findAll({
      where: { userId: userId },
    });
    if (documents === undefined)
      return res.status(400).send("Documents not found");
    else {
      const result = documents.map((document) => {
        return {
          title: document.title,
          type: "doc",
          date: document.date.toLocaleDateString("en-us", dateOptions),
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
          link: `document?documentId=${document.id}`,
        };
      });
      res.status(200).send({
        documents: result,
        messege: "Documents found",
      });
    }
  }

  async getDocumentLayout(req, res) {
    const id = req.body.templateId;
    const template = await Template.findByPk(id);
    if (template)
      res.status(200).send({ layout: template.data, messege: "Layout found" });
    else res.status(400).send("Layout not found");
  }
}

module.exports = new documentController();
