const { appDataSource } = require("./dataSource");

const createUser = async (
  name,
  email,
  password,
  phoneNumber,
  privacyTermEssential
) => {
  const result = await appDataSource.query(
    `
  INSERT INTO users (
    name,
    email,
    password,
    phone_number,
    privacy_term_essential
  ) VALUES (?, ?, ?, ?, ?)
  `,
    [name, email, password, phoneNumber, privacyTermEssential]
  );
  console.log(result, 123123123123);
  return result.insertId;
};

module.exports = {
  createUser,
};
