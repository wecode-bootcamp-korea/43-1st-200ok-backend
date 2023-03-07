-- migrate:up
CREATE TABLE products_color(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  color VARCHAR(30) NOT NULL
)

-- migrate:down

