const { invalidEmailService } = require("../services");
const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    appDataSource.destroy();
  });

const check = async (req, res) => {
  const { email } = req.body;

  const [result] = await appDataSource.query(
    `SELECT password, name, phone_number, email, privacy_term_essential 
    FROM users 
    WHERE email = ?`,
    [email]
  );

  if (typeof result == "undefined") {
    return res.status(400).json({ result: "가입 가능한 이메일 입니다." });
  } else {
    return res.status(400).json({ result: "이미 가입된 이메일 입니다." });
  }
};

module.exports = { check };
