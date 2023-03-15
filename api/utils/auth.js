const jwt = require("jsonwebtoken");

const { userDao } = require("../services");
const { catchAsync } = require("../utils/error");

const loginRequired = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;

    throw error;
  }

  // 2) Verification token
  const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const user = await userDao.getUserById(decoded.id);

  if (!user) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;

    throw error;
  }

  // 4) GRANT ACCESS
  req.user = user;
  next();
});

module.exports = { loginRequired };
