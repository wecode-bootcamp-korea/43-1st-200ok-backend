-- migrate:up
CREATE TABLE product_sizes(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  size VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE product_sizes;