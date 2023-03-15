const { appDataSource } = require("./dataSource");

const checkEmailDuplicacy = async (email) => {
  const [result] = await appDataSource.query(
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

module.exports = { checkEmailDuplicacy };
