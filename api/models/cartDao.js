const dbDataSource = require("./dataSource");
const jwt = require("jsonwebtoken");

const postCart = async (productId, size, color, quantity, token) => {
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
  };
  const productOptionId = await getProductOptionId(color, size, productId);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userEmail = decoded.email;
  const userId = await dbDataSource.query(
    `
    SELECT id
    FROM users
    WHERE email = ?
    `,
    [userEmail]
  );
  let uid = userId[0].id;
  let poid = productOptionId[0].id;

  const length = await dbDataSource.query(
    `
    SELECT * FROM carts WHERE carts.user_id = ? AND carts.product_option_id = ?
    `,
    [uid, poid]
  );
  if (length.length > 0) {
    await dbDataSource.query(
      `
      UPDATE carts SET quantity = ? WHERE carts.user_id = ?
      `,
      [parseInt(length[0].quantity) + parseInt(quantity), uid]
    );
  } else {
    await dbDataSource.query(
      `
      INSERT INTO carts (quantity, user_id, product_option_id)
      VALUES (?, ?, ?);
      `,
      [quantity, uid, poid]
    );
  }
};

const getCart = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userEmail = decoded.email;
  const userId = await dbDataSource.query(
    `
    SELECT id
    FROM users
    WHERE email = ?
    `,
    [userEmail]
  );
  let uid = userId[0].id;
  const result = await dbDataSource.query(
    `
    SELECT 
    name, image_url, (1-0.01*discount_rate)*price as discount_price, carts.quantity, carts.id as cartId, product_colors.color, product_sizes.size
    FROM 
    products
    JOIN 
    product_options
    ON 
    product_options.product_id = products.id
    JOIN 
    carts
    ON
    product_options.id = carts.product_option_id
    JOIN
    product_colors
    ON
    product_options.product_color_id = product_colors.id
    JOIN
    product_sizes
    ON
    product_options.product_size_id = product_sizes.id
    WHERE 
    carts.user_id = ?
    `,
    [uid]
  );
  return result;
};

const deleteCart = async (cartId, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userEmail = decoded.email;
  const userId = await dbDataSource.query(
    `
    SELECT id
    FROM users
    WHERE email = ?
    `,
    [userEmail]
  );
  let uid = userId[0].id;

  let splitedCartId = cartId.split(",");

  for (let i = 0; i < splitedCartId.length; i++) {
    await dbDataSource.query(
      `
      DELETE FROM
      carts
      WHERE
      carts.id = ?
      `,
      [splitedCartId[i]]
    );
  }

  const result = await dbDataSource.query(
    `
    SELECT
    products.name, products.image_url, (1-0.01*discount_rate)*price as discount_price, carts.quantity, carts.product_option_id
    FROM
    products
    JOIN
    carts
    ON
    products.id = carts.user_id
    WHERE
    carts.user_id = ?
    `,
    [uid]
  );
  return result;
};

module.exports = {
  postCart,
  getCart,
  deleteCart,
};
