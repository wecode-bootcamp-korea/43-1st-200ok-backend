const { productService } = require("../services");
const { catchAsync } = require("../utils/error");

const getProductsGenderStatusCategory = catchAsync(async (req, res) => {
  const condition = req.query;
  const products = await productService.getProductsGenderStatusCategory(
    condition
  );
  return res.status(200).json({ data: products });
});

module.exports = {
  getProductsGenderStatusCategory,
};
