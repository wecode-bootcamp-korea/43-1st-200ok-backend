const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

const loginRequired = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message: error.message });
  }

  const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);

  const user = await userDao.getUserById(decoded.id);

  if (!user) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;

    return res.status(error.statusCode).json({ message: error.message });
  }

  req.user = user;

  next();
};

module.exports = { loginRequired };
