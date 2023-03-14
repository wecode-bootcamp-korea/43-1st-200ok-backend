const userService = require("../services/userService");

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

  return res.status(201).json({ message: insertId });
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const accessToken = await userService.signIn(email, password);
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { signUp, signIn };
