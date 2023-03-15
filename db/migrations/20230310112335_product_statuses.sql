-- migrate:up
CREATE TABLE product_statuses(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(30) NULL
)

-- migrate:down