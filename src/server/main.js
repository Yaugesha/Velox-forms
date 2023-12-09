const express = require("express");
const ViteExpress = require("vite-express");
const { sequelize } = require("./db");
const userRoutes = require("./src/users/routes");
const templateRoutes = require("./src/templates/routes");
const documentRoutes = require("./src/documents/routes");
const applicationRoutes = require("./src/applications/routes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/templates", templateRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/applications", applicationRoutes);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
  );
};
start();
