const dbDataSource = require("./dataSource");
const jwt = require("jsonwebtoken");

const postCart = async (condition) => {
  // cart에 수량이랑 user_id랑 다 같이 넘거야함
  let productId = condition.productId;
  let size = condition.size;
  let color = condition.color;
  let quantity = condition.quantity;
  let userId = condition.userId;
  let userIdTest =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzg4NDMzNDIsImV4cCI6MTY3OTAxNjE0Mn0.7yq-OQJRPNF5CnzFuhO3OfHLL9bsQtuLi8xoSL7p79c";
  // email = "poiuy09876@email.com"

  console.log("@@@@@@@@@@@@");
  console.log(productId, size, color, quantity, userId);
  console.log("@@@@@@@@@@@@");

  if (color == "blue") {
    color = 1;
  } else if (color == "black") {
    color = 2;
  } else if (color == "gray") {
    color = 3;
  } else if (color == "red") {
    color = 4;
  } else if (color == "yellow") {
    color = 5;
  } else if (color == "green") {
    color = 6;
  } else if (color == "purple") {
    color = 7;
  }

  if (size == "m") {
    size = 1;
  } else if (size == "l") {
    size = 2;
  } else if (size == "xl") {
    size = 3;
  }

  console.log("@@@@@@@@@@@@");
  console.log(productId, size, color, quantity, userId);
  console.log("@@@@@@@@@@@@");

  const getProductOptionId = async (color, size, productId) => {
    const productOptionId = await dbDataSource.query(
      `
      SELECT product_options.id
      FROM product_options
      WHERE product_options.product_color_id = ?
      AND product_options.product_size_id = ?
      AND product_options.product_id = ?
      `,
      [color, size, productId]
    );
    return productOptionId;
  }; // product_option id를 받음
  let productOptionId = await getProductOptionId(color, size, productId);

  console.log("#############");
  console.log(productOptionId[0].id);
  console.log("#############");

  let decoded = jwt.verify(userIdTest, process.env.JWT_SECRET);
  console.log(decoded);
  console.log(decoded.id);

  const getUserIdByToken = async (userId) => {
    const userIdByToken = await dbDataSource.query(
      `
      SELECT products.id
      FROM products
      `
    );
  }; // token값 비교를 통해 user_id가 누구인지 알아냄

  const result = await dbDataSource.query(
    `
    INSERT INTO carts (quantity, user_id, product_option_id)
    VALUES (?, ?, ?);
    `,
    [quantity, userId, productOptionId[0].id]
  );
  return result.status(201).json({ message: "CART ADDED" });
};
// enum 객체로 정리 object.freeze
module.exports = {
  postCart,
};
