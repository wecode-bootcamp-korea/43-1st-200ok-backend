-- migrate:up
CREATE TABLE orders_statuses(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(300) NOT NULL
)


-- migrate:down