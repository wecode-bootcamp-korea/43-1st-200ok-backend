const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getProductsStatusGender = catchAsync(async (req, res) => {
  const condition = req.query;
  const products = await productService.getProductsStatusGender(condition);
  return res.status(200).json({ data: products });
});

const getProductsGenderCategory = catchAsync(async (req, res) => {
  const condition = req.query;
  const products = await productService.getProductsGenderCategory(condition);
  return res.status(200).json({ data: products });
});

// const getNews = catchAsync(async (req, res) => {
//   const products = await productService.getNews();
//   return res.status(200).json({ data: products });
// });

module.exports = {
  getProductsStatusGender,
  getProductsGenderCategory,
};
