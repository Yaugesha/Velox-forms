const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

app.get("/sayHello", (req, res) => {
  res.send({ text: "Hello Vite + React!" });
  //res.send("<h2>Hello Vite + React!</h2>");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

// import { Client } from "pg";
// const client = new Client();
// await client.connect();

// const res = await client.query("SELECT $1::text as message", ["Hello world!"]);
// console.log(res.rows[0].message); // Hello world!
// await client.end();
