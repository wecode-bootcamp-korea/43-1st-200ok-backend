const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const postCart = catchAsync(async (req, res) => {
  const condition = req.query;
  console.log("!!!!!!!!!!!!!!!!");
  console.log(condition);
  console.log("!!!!!!!!!!!!!!!!");

  const carts = await cartService.postCart(condition);
  return res.status(200).json({ data: carts });
});

module.exports = {
  postCart,
};
