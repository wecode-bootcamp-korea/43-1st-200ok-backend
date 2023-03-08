-- migrate:up
CREATE TABLE carts(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity INT NOT NULL,
  user_id INT NOT NULL,
  product_option_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT carts_users_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT carts_product_options_product_option_id FOREIGN KEY (product_option_id) REFERENCES product_options(id)
)

-- migrate:down