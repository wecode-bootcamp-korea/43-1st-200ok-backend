-- migrate:up
CREATE TABLE product_colors(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  color VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE product_colors;
