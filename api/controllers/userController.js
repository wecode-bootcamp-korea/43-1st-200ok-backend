const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { password, name, phoneNumber, email, privacyTermEssential } = req.body;

  if (!password || !name || !phoneNumber || !email || !privacyTermEssential) {
    const error = new Error("값이 잘못되었습니다.");
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
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await userService.signIn(email, password);

  return res.status(200).json({ accessToken });
});

const checkSignedEmail = catchAsync(async (req, res) => {
  const { email } = req.query;
  const result = await userService.checkSignedEmail(email);

  if (!result) {
    return res.status(400).json({ message: "가입 가능한 이메일 입니다." });
  }

  return res.status(200).json({ message: "이미 가입된 이메일 입니다." });
});

module.exports = { signUp, signIn, checkSignedEmail };
