const { where } = require("sequelize");
const {
  Application,
  ApplicationData,
  ApplicationStatus,
} = require("../../models/models");
const { application } = require("express");

class applicationConroller {
  async addStatus(userId, applicationId, date) {
    await ApplicationStatus.create({
      applicationId: applicationId,
      userId: userId,
      name: "recieved",
      comment: "",
      timeOfChange: date,
    });
  }

  async createApplication(req, res) {
    const userId = req.user.id;
    const { category, title, file, comment } = req.body;
    console.log(category, title, file, req.body, comment, userId);
    const date = new Date();
    await Application.create({
      date: date,
      userId: userId,
    }).then(async (application) => {
      console.log(application);
      await ApplicationData.create({
        applicationId: application.dataValues.id,
        category: category,
        name: title,
        fileRoute: file,
        comment: comment,
      }).then(() => {
        console.log("application saved");
        res.status(200).send({
          file: file,
          messege: "Application saved",
        });
      });
      await ApplicationStatus.create({
        applicationId: application.dataValues.id,
        userId: userId,
        name: "recieved",
        comment: "",
        timeOfChange: date,
      });
    });
  }

  saveReferenceFile(req, res) {
    const uploadedFile = req.file.path;
    res
      .status(200)
      .send({ fileLink: uploadedFile, messege: "File uploaded successfully!" });
  }

  async getUserApplications(req, res) {
    const userId = req.user.id;
    const dateOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const applications = await Application.findAll({
      where: { userId: userId },
      include: [ApplicationData, ApplicationStatus],
    });

    res.status(200).send({
      applications: applications.map((application) => {
        return {
          id: application.dataValues.id,
          date: application.dataValues.date.toLocaleDateString(
            "en-us",
            dateOptions
          ),
          data: application["application datum"],
          statuses: application["application statuses"].map((status) => {
            status = status.dataValues;
            return {
              name: status.name,
              comment: status.comment,
              date: status.timeOfChange.toLocaleDateString(
                "en-us",
                dateOptions
              ),
            };
          }),
        };
      }),
      message: "Applications was found",
    });
  }
}

module.exports = new applicationConroller();
