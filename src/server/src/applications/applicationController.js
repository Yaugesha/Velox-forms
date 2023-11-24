const {
  Application,
  ApplicationData,
  ApplicationStatus,
} = require("../../models/models");

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
        comment: "Your application saved and soon will processed be by admin",
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

  async getApplication(req, res) {
    const dateOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const applicationId = req.get("ApplicationId");
    const application = await Application.findOne({
      where: { id: applicationId },
      include: [ApplicationData, ApplicationStatus],
    });
    res.status(200).send({
      application: {
        userId: application.userId,
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
            date: status.timeOfChange.toLocaleDateString("en-us", dateOptions),
          };
        }),
      },
      message: "Applications was found",
    });
  }

  async getApplications(req, res) {
    const dateOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const applications = await Application.findAll({
      include: [ApplicationData, ApplicationStatus],
    });
    res.status(200).send({
      applications: applications.map((application) => {
        return {
          userId: application.userId,
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

  async deleteApplication(req, res) {
    const { applicationId } = req.body;
    await Application.destroy({ where: { id: applicationId } })
      .then((result) => {
        if (result === 1)
          res.status(200).send({ message: "Application deleted successfully" });
        else
          res
            .status(204)
            .send({ message: "This applicaton has already been removed" });
      })
      .catch();
  }

  async editApplication(req, res) {
    const { applicationId, category, name, comment } = req.body;
    const application = await ApplicationData.findOne({
      where: { applicationId },
    });
    console.log("got");
    console.log(category, name, comment);
    application.category = category ? category : application.category;
    application.name = name ? name : application.name;
    application.comment = comment ? comment : application.comment;
    await application
      .save()
      .then((result) => {
        console.log("updated");
        console.log(result.dataValues);
        if (result)
          res.status(200).send({ message: "Application updated successfully" });
        else res.status(400).send({ message: "Failed to update application" });
      })
      .catch((error) => res.status(400).send({ message: error }));
  }
}

module.exports = new applicationConroller();
