const emailValidate = (email) => {
  const emailregex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (!emailregex.test(email)) {
    const error = new Error("invalidEmail");
    error.statusCode = 400;
  }
};

const passwordValidate = (password) => {
  const passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!passwordregex.test(password)) {
    const error = new Error("invalidPassword");
    error.statusCode = 400;
  }
};

module.exports = {
  emailValidate,
  passwordValidate,
};
