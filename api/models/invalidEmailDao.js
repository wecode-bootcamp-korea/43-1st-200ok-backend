const { appDataSource } = require("./dataSource");

const checkEmailDuplicacy = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT
        id
      FROM
        users
      WHERE
        users.id=?`,
    [userId]
  );
  console.log(result);
};

module.exports = { checkEmailDuplicacy };
