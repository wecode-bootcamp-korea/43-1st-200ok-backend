const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

const hashPassword = async (plainTextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plainTextPassword, salt);
};

const signUp = async (
  password,
  name,
  phoneNumber,
  email,
  privacyTermEssential
) => {
  const hashedPassword = await hashPassword(password);
  return userDao.createUser(
    hashedPassword,
    name,
    phoneNumber,
    email,
    privacyTermEssential
  );
};

module.exports = { signUp };
