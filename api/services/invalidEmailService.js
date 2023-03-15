const { invalidEmailDao } = require("../models");

const checkSignedEmail = async (email) => {
  return invalidEmailDao.checkEmailDuplicacy(email);
};

module.exports = { checkSignedEmail };
