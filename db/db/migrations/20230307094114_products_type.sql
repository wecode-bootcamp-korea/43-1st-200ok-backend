-- migrate:up
CREATE TABLE products_type(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(30) NOT NULL
)

-- migrate:down

