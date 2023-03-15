const { cartDao } = require("../models");

const postCart = async (condition) => {
  return cartDao.postCart(condition);
};

module.exports = {
  postCart,
};
