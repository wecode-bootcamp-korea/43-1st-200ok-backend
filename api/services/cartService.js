const { cartDao } = require("../models");

const postCart = async (productId, size, color, quantity, token) => {
  return cartDao.postCart(productId, size, color, quantity, token);
};

const getCart = async (token) => {
  return cartDao.getCart(token);
};

const deleteCart = async (cartId, token) => {
  return cartDao.deleteCart(cartId, token);
};

module.exports = {
  postCart,
  getCart,
  deleteCart,
};
