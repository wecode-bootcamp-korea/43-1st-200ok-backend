-- migrate:up
CREATE TABLE carts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity INT NOT NULL,
  size VARCHAR(30) NOT NULL,
  color VARCHAR(30) NOT NULL,
  products_id INT NOT NULL,
  users_id INT NOT NULL,
  CONSTRAINT carts_products_products_id FOREIGN KEY (products_id) REFERENCES products(id),
  CONSTRAINT carts_users_users_id FOREIGN KEY (users_id) REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down

