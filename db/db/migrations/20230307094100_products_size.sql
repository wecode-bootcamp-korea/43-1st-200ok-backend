-- migrate:up
CREATE TABLE products_size(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  size VARCHAR(30) NOT NULL
)

-- migrate:down

