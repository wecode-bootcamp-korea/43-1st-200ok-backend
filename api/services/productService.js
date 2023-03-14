const { productDao } = require("../models");

const getProductsGenderStatusCategory = async (condition) => {
  return productDao.getProductsGenderStatusCategory(condition);
};

module.exports = {
  getProductsGenderStatusCategory,
};
