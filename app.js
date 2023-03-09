require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dbDataSource = require("./api/models/dataSource");
const route = require("./api/routes");

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

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.get("/mainpage/bests/man", async (req, res) => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    (products.product_gender_id = product_genders.id)
    AND
    (product_genders.id = 1)
    JOIN 
    product_bests
    ON
    (product_bests.id = products.product_best_id)
    AND
    (product_bests.id = 1)
    `
  );
  return res.status(200).json({ data: result });
});

app.get("/mainpage/bests/woman", async (req, res) => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    (products.product_gender_id = product_genders.id)
    AND
    (product_genders.id = 2)
    JOIN 
    product_bests
    ON
    (product_bests.id = products.product_best_id)
    AND
    (product_bests.id = 1)
    `
  );
  return res.status(200).json({ data: result });
});

app.get("/mainpage/news", async (req, res) => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN 
    product_news
    ON
    (product_news.id = products.product_new_id)
    AND
    (product_news.id = 1)
    `
  );
  return res.status(200).json({ data: result });
});

app.get("/mainpage/man", async (req, res) => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    (products.product_gender_id = product_genders.id)
    AND
    (product_genders.id = 1)
    `
  );
  return res.status(200).json({ data: result });
});

app.get("/mainpage/woman", async (req, res) => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    (products.product_gender_id = product_genders.id)
    AND
    (product_genders.id = 2)
    `
  );
  return res.status(200).json({ data: result });
});

app.listen(PORT, LOCALADDRESS, () => {
  console.log(
    `🚀🚀🚀 Server Listening to request on ${LOCALADDRESS}:${PORT} 🚀🚀🚀`
  );
});
