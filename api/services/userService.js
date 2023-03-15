const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { emailValidate, passwordValidate } = require("../utils/userValidate.js");

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

  if (!user) {
    res.status(401).json({ result: "이메일이 잘못되었습니다." });
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(401).json({ result: "비밀번호가 잘못되었습니다." });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return accessToken;
};

module.exports = { signUp, signIn };
