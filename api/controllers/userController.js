const userService = require("../services/userService");
const { invalidEmailService } = require("../services");

const signUp = async (req, res) => {
  const { password, name, phoneNumber, email, privacyTermEssential } = req.body;

  if (!password || !name || !phoneNumber || !email || !privacyTermEssential) {
    const error = new Error("값이 잘못되었습니다.");
    error.statusCode = 400;
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

const checkSignedEmail = async (req, res) => {
  const { email } = req.body;
  const result = await invalidEmailService.checkSignedEmail(email);
  console.log(result);

  if (!result) {
    return res.status(400).json({ message: "가입 가능한 이메일 입니다." });
  } else {
    return res.status(201).json({ message: "이미 가입된 이메일 입니다." });
  }
};

module.exports = { signUp, signIn, checkSignedEmail };
