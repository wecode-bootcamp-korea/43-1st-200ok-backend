-- migrate:up
CREATE TABLE order_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quantity INT NOT NULL,
  product_option_id INT NOT NULL,
  order_id INT NOT NULL,
  order_status_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT order_items_product_options_product_option_id_fkey FOREIGN KEY (product_option_id) REFERENCES product_options(id),
  CONSTRAINT order_items_orders_order_id_fkey FOREIGN KEY (orders_id) REFERENCES orders(id),
  CONSTRAINT order_items_order_statuses_order_status_id_fkey FOREIGN KEY (order.status_id) REFERENCES order.statuses(id)
)

-- migrate:down