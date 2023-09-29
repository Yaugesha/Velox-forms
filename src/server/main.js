const express = require("express");
const ViteExpress = require("vite-express");
const userRoutes = require("./src/users/routes");

const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello Vite + Express!");
// });

//app.use("/api/v1/users", userRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
