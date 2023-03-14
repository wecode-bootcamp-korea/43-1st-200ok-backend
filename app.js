require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const routes = require("./api/routes");

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, HOST, () => {
  console.log(`🚀🚀🚀 Server Listening to request on ${PORT} 🚀🚀🚀`);
});
