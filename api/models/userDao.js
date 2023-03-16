const dbDataSource = require("./dataSource");

const createUser = async (
  password,
  name,
  phoneNumber,
  email,
  privacyTermEssential
) => {
  const result = await dbDataSource.query(
    `
  INSERT INTO users (password, name, phone_number, email, privacy_term_essential) VALUES (?, ?, ?, ?, ?)
    `,
    [password, name, phoneNumber, email, privacyTermEssential]
  );
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const result = await dbDataSource.query(
    `
		SELECT 
    password, name, phone_number, email, privacy_term_essential
		FROM  users
		WHERE email=?
	`,
    [email]
  );

  return result[0];
};

const getUserById = async (id) => {
  const result = await dbDataSource.query(
    `
		SELECT 
    password, name, phone_number, email, privacy_term_essential
		FROM users
		WHERE id=?
	`,
    [id]
  );

  return result[0];
};

const checkEmailDuplicacy = async (email) => {
  const [result] = await dbDataSource.query(
    `SELECT
        email
      FROM
        users
      WHERE
        email=?`,
    [email]
  );
  return result;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  checkEmailDuplicacy,
};
