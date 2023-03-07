-- migrate:up
CREATE TABLE products_gender(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  gender VARCHAR(30) NOT NULL
)

-- migrate:down

