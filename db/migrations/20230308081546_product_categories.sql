-- migrate:up
CREATE TABLE product_categories(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE product_categories;
