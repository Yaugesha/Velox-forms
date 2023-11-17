const {
  Application,
  ApplicationData,
  ApplicationStatus,
} = require("../../models/models");

class applicationConroller {
  async createApplication(req, res) {
    const userId = req.user.id;
    const { category, title, file, comment } = req.body;
    console.log(category, title, file, req.body, comment, userId);
    const date = new Date();
    await Application.create({
      date: date,
      userId: userId,
    }).then(async (application) => {
      await ApplicationData.create({
        applicationId: application.id,
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
        applicationId: application.id,
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
}

module.exports = new applicationConroller();
