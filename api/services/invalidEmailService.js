const { invalidEmailDao } = require("../models");

const check = async () => {
  return invalidEmailDao.check();
};

module.exports = { check };
