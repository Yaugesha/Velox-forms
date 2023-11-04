const express = require("express");
const ViteExpress = require("vite-express");
const { sequelize } = require("./db");
const userRoutes = require("./src/users/routes");
const models = require("./models/models");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000...")
  );
};
start();
