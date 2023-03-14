const dbDataSource = require("./dataSource");

const postCart = async (condition) => {
  // cart에 수량이랑 user_id랑 다 같이 넘거야함
  let productId = condition.productId;
  let size = condition.size;
  let color = condition.color;
  let quantity = condition.quantity;

  if (color == "blue") {
    color == 1;
  } else if (color == "black") {
    color == 2;
  } else if (color == "gray") {
    color == 3;
  } else if (color == "red") {
    color == 4;
  } else if (color == "yellow") {
    color == 5;
  } else if (color == "green") {
    color == 6;
  } else if (color == "purple") {
    color == 7;
  }

  if (size == "m") {
    size == 1;
  } else if (size == "l") {
    size == 2;
  } else if (size == "xl") {
    size == 3;
  }

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
  };
  const productOptionId = getProductOptionId(color, size, productId);

  const result = await dbDataSource.query(
    `
    INSERT INTO carts (quantity, user_id, product_option_id)
    VALUES (?, ?, ?);
    `,
    [quantity]
  );
};
// enum 객체로 정리 object.freeze
module.exports = {
  postCart,
};
