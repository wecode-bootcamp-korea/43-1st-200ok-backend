const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

const hashPassword = async (plainTextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plainTextPassword, salt);
};

const signUp = async (
  name,
  email,
  password,
  phoneNumber,
  privacyTermEssential
) => {
  const hashedPassword = await hashPassword(password);
  return userDao.createUser(
    name,
    email,
    hashedPassword,
    phoneNumber,
    privacyTermEssential
  );
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("이메일이 잘못되었습니다.");
    error.statusCode = 401;
    throw error;
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error("비밀번호가 잘못되었습니다.");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return accessToken;
};

module.exports = { signUp, signIn };
