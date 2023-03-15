const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  emailValidate,
  passwordValidate,
} = require("../utils/validate-check.js");
const { userDao } = require("../models");

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
  await emailValidate(email);
  await passwordValidate(password);

  const hashedPassword = await hashPassword(password);

  return userDao.createUser(
    hashedPassword,
    name,
    phoneNumber,
    email,
    privacyTermEssential
  );
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);
  const match = await bcrypt.compare(password, user.password);

  if (!user || !match) {
    res.status(401).json({ result: "로그인 정보가 잘못되었습니다." });
  }

  const accessToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return accessToken;
};

const checkSignedEmail = async (email) => {
  return userDao.checkEmailDuplicacy(email);
};

module.exports = { signUp, signIn, checkSignedEmail };
