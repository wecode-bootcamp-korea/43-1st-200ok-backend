const { invalidEmailDao } = require("../models");

const checkSignedEmail = async (userId) => {
  return invalidEmailDao.checkEmailDuplicacy(userId);
};

module.exports = { checkSignedEmail };
