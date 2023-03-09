-- migrate:up
CREATE TABLE product_bests(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  best VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE product_bests;
