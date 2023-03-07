-- migrate:up
CREATE TABLE orders_item (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity INT NOT NULL,
  products_option_id INT NOT NULL,
  orders_id INT NOT NULL,
  orders_status_id INT NOT NULL,
  CONSTRAINT orders_item_products_option_products_option_id_fkey FOREIGN KEY (products_option_id) REFERENCES products_option(id)
  CONSTRAINT orders_item_orders_orders_id_fkey FOREIGN KEY (orders_id) REFERENCES orders(id)
  CONSTRAINT orders_item_orders_status_orders_status_id_fkey FOREIGN KEY (orders.status_id) REFERENCES orders.status(id)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down

