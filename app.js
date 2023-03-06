require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const DbdataSource = require("./api/models/dataSource");
const route = require("./api/routes");

DbdataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(route);
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});
app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀🚀🚀 Server Listening to request on 127.0.0.1:${PORT} 🚀🚀🚀`);
});
