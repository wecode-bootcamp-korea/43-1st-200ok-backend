const userService = require("../services/userService");
const { DataSource } = require("typeorm");

const signUp = async (req, res) => {
  const { password, name, phoneNumber, email, privacyTermEssential } = req.body;

  if (!password || !name || !phoneNumber || !email || !privacyTermEssential) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  const insertId = await userService.signUp(
    password,
    name,
    phoneNumber,
    email,
    privacyTermEssential
  );

  return res.status(201).json({ insertId });
};

module.exports = { signUp };
