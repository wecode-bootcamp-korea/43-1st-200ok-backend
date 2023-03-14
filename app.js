require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { appDataSource } = require("./api/models/datasource");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const routes = require("./api/routes");

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
