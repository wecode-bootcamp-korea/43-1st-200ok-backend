const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const postCart = catchAsync(async (req, res) => {
  const condition = req.body;
  const carts = await cartService.postCart(condition);
  return res.status(200).json({ data: carts });
});

module.exports = {
  postCart,
};
