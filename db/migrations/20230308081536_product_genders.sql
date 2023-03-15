-- migrate:up
CREATE TABLE product_genders(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  gender VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE product_genders;