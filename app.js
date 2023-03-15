require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const route = require("./api/routes");
const dbDataSource = require("./api/models/dataSource");
const { globalErrorHandler } = require("./api/utils/error");

dbDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

const app = express();
const PORT = process.env.PORT;
const IPADDRESS = process.env.IPADDRESS;
const LOCALADDRESS = process.env.LOCALADDRESS;

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(route);
app.use(globalErrorHandler);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.listen(PORT, LOCALADDRESS, () => {
  console.log(
    `🚀🚀🚀 Server Listening to request on ${LOCALADDRESS}:${PORT} 🚀🚀🚀`
  );
});
