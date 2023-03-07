-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  orders_number VARCHAR(100) NOT NULL, 
  orders_status_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT orders_orders_status_orders_status_id_fkey FOREIGN KEY (orders_status_id) REFERENCES orders_status(id)
  CONSTRAINT orders_users_users_id_fkey FOREIGN KEY (users_id) REFERENCES users(id)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down

