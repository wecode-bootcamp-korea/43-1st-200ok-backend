const { invalidEmailService } = require("../services");

const checkSignedEmail = async (req, res) => {
  const email = req.query;
  const userId = email["user_id"];
  await invalidEmailService.checkSignedEmail(userId);

  if (userId == "undefined") {
    return res.status(201).json({ message: "가입 가능한 이메일 입니다." });
  } else {
    return res.status(400).json({ message: "이미 가입된 이메일 입니다." });
  }
};

module.exports = { checkSignedEmail };
