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
const dateOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};

const parseDocument = (document) => {
  return {
    ...document,
    date: document.date.toLocaleDateString("en-us", dateOptions),
    picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    link: `documentFile?documentId=${document.id}`,
  };
};

class documentController {
  async saveDocument(req, res) {
    const { title, data, file } = req.body;
    const token = req.get("Bearer");
    const userId = jwt.verify(token, jwtKey()).id;
    const date = new Date();

    await Document.create({
      title: title,
      date: date,
      data: data,
      userId: userId,
    }).then((document) => {
      console.log("document saved");
      res.status(200).send({
        document: parseDocument(document.dataValues),
        file: file,
        message: "Document saved",
      });
    });
  }

  async getAllDocuments(req, res) {
    const token = req.get("Bearer");
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
    else if (documents.length === 0) {
      res.status(400).send({
        message: `You haven't created any documents yet. Select a template and fill it out to create your first
           document using Velox Forms. Or, if you don't find one that suits you, you can apply for a new
            template to be created on your profile.`,
      });
    } else {
      const result = documents.map((document) => {
        return {
          id: document.id,
          title: document.title,
          type: "doc",
          date: document.date.toLocaleDateString("en-us", dateOptions),
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
          link: `documentFile?documentId=${document.id}`,
        };
      });
      res.status(200).send({
        documents: result,
        message: "Documents found",
      });
    }
  }

  async getDocumentFile(req, res) {
    const id = req.body.documentId;
    const document = await Document.findByPk(id);
    if (document)
      res.status(200).send({ layout: document.file, message: "File found" });
    else res.status(400).send("File not found");
  }

  async renameDocument(req, res) {
    const { documentId, title } = req.body;
    const userId = req.user.id;
    Document.update(
      { title: title },
      { where: { id: documentId, userId: userId } }
    )
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).send({
            message: "Document name changed",
          });
        } else res.status(400).send({ message: "Document not found" });
      })
      .catch((error) => {
        res.status(400).send({ message: "Error in renaming document" });
      });
  }

  async deleteDocument(req, res) {
    const { documentId } = req.body;
    const userId = req.user.id;
    await Document.destroy({ where: { id: documentId, userId: userId } })
      .then((result) => {
        res.status(200).send({
          message: "Document deleted",
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  }
}

module.exports = new documentController();
