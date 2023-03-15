const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const postCart = catchAsync(async (req, res) => {
  try {
    const condition = req.query;
    let productId = condition.productId;
    let size = condition.size.toUpperCase();
    let color = condition.color.toUpperCase();
    let quantity = condition.quantity;
    let userId = condition.userId;

    const carts = await cartService.postCart(
      productId,
      size,
      color,
      quantity,
      userId
    );
    return res.status(200).json({ data: carts });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = {
  postCart,
};
