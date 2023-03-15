const { cartDao } = require("../models");

const postCart = async (productId, size, color, quantity, userId) => {
  return cartDao.postCart(productId, size, color, quantity, userId);
};

module.exports = {
  postCart,
};
