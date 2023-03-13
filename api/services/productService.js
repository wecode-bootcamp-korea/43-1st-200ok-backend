const { productDao } = require("../models");

const getProductsStatusGender = async (condition) => {
  return productDao.getProductsStatusGender(condition);
};

const getProductsGenderCategory = async (condition) => {
  return productDao.getProductsGenderCategory(condition);
};

module.exports = {
  getProductsStatusGender,
  getProductsGenderCategory,
};
