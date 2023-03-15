const dbDataSource = require("./dataSource");
const jwt = require("jsonwebtoken");

const postCart = async (productId, size, color, quantity, userId) => {
  // cart에 수량이랑 user_id랑 다 같이 넘거야함
  // let userIdTest =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzg4NDMzNDIsImV4cCI6MTY3OTAxNjE0Mn0.7yq-OQJRPNF5CnzFuhO3OfHLL9bsQtuLi8xoSL7p79c";
  // email = "poiuy09876@email.com"

  console.log("@@@@@@@@@@@@");
  console.log(productId, size, color, quantity, userId);
  console.log("@@@@@@@@@@@@");

  const colorEnum = Object.freeze({
    BLUE: 1,
    BLACK: 2,
    GRAY: 3,
    RED: 4,
    YELLOW: 5,
    GREEN: 6,
    PURPLE: 7,
  });
  color = colorEnum[color];

  const sizeEnum = Object.freeze({
    M: 1,
    L: 2,
    XL: 3,
  });
  size = sizeEnum[size];

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
  const productOptionId = await getProductOptionId(color, size, productId);
  console.log(productOptionId[0].id); // product_option id를 받음

  const decoded = jwt.verify(userIdTest, process.env.JWT_SECRET);
  console.log(decoded);
  console.log(decoded.id); // 이렇게 하면 그 토큰을 쓴 user_id가 누구인지 알 수 있음

  const addToCart = await dbDataSource.query(
    `
    INSERT INTO carts (quantity, user_id, product_option_id)
    VALUES (?, ?, ?);
    `,
    [quantity, decoded.id, productOptionId[0].id]
  );
  return result.status(201).json({ message: "CART ADDED" });
};

module.exports = {
  postCart,
};
