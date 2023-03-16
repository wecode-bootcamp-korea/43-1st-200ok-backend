const { cartService } = require("../services");
const { catchAsync } = require("../utils/error");

const postCart = catchAsync(async (req, res) => {
  try {
    const condition = req.query;
    let productId = condition.productId;
    let size = condition.size.toUpperCase();
    let color = condition.color.toUpperCase();
    let quantity = condition.quantity;
    let token = condition.token;
    const carts = await cartService.postCart(
      productId,
      size,
      color,
      quantity,
      token
    );
    return res.status(200).json({ data: carts });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
});

const getCart = catchAsync(async (req, res) => {
  try {
    const condition = req.query;
    const token = condition.token;
    const carts = await cartService.getCart(token);
    return res.status(200).json({ data: carts });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
});

const deleteCart = catchAsync(async (req, res) => {
  try {
    const condition = req.query;
    let cartId = condition.cartId;
    let token = condition.token;
    const carts = await cartService.deleteCart(cartId, token);
    return res.status(200).json({ data: carts });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
});

module.exports = {
  postCart,
  getCart,
  deleteCart,
};
