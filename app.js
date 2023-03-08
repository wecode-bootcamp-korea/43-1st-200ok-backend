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

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(route);

app.post("/products", async (req, res) => {
  const { name, price, discountRate, imageUrl } = req.body;

  await dbDataSource.query(
    `
    INSERT INTO products ( 
      name, price, discount_rate, image_url
    )
    VALUES (
      ?, ?, ?, ?
    )
    `,
    [name, price, discountRate, imageUrl]
  );

  return res.status(200).json({ message: "PRODUCTS_CREATED" });
}); // 물건 등록

app.post("/products/category", async(req, res) => {
  const {category} = req.body;

  await dbDataSource.query(
    `
    INSERT INTO products_category (
      category
    )
    values
    (?)
    `, 
    [category]
  );
  res.status(201).json({message: "PRODUCTS_CATEGORY_CREATED"});
});

app.post("/products/category", async(req, res) => {
  const {category} = req.body;

  await dbDataSource.query(
    `
    INSERT INTO products_category (
      category
    )
    values
    (?)
    `, 
    [category]
  );
  res.status(201).json({message: "PRODUCTS_CATEGORY_CREATED"});
});

app.post("/products/gender", async(req, res) => {
  const {gender} = req.body;

  await dbDataSource.query(
    `
    INSERT INTO products_gender (
      gender
    )
    values
    (?)
    `, 
    [gender]
  );
  res.status(201).json({message: "PRODUCTS_GENDER_CREATED"});
});

app.post("/products/color", async(req, res) => {
  const {color} = req.body;

  await dbDataSource.query(
    `
    INSERT INTO products_color (
      color
    )
    values
    (?)
    `, 
    [color]
  );
  res.status(201).json({message: "PRODUCTS_COLOR_CREATED"});
});

app.post("/products/size", async(req, res) => {
  const {size} = req.body;

  await dbDataSource.query(
    `
    INSERT INTO products_size (
      size
    )
    values
    (?)
    `, 
    [size]
  );
  res.status(201).json({message: "PRODUCTS_SIZE_CREATED"});
});

app.post("/products/option", async(req, res) => {
  const {productsId, productsSizeId, productsColorId, productsGenderId, productsCategoryId} = req.body;

  await dbDataSource.query(
    `
    INSERT INTO products_option (
      products_id, products_size_id, products_color_id, products_gender_id, products_category_id
    )
    values
    (?, ?, ?, ?)
    `, 
    [productsId, productsSizeId, productsColorId, productsGenderId, productsCategoryId]
  );
  res.status(201).json({message: "PRODUCTS_OPTION_CREATED"});
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀🚀🚀 Server Listening to request on 127.0.0.1:${PORT} 🚀🚀🚀`);
});
