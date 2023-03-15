-- migrate:up
CREATE TABLE product_options(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_size_id INT NOT NULL,
  product_color_id INT NOT NULL,
  product_id INT NOT NULL,
  CONSTRAINT product_options_product_size_id FOREIGN KEY (product_size_id) REFERENCES product_sizes(id),
  CONSTRAINT product_options_product_color_id FOREIGN KEY (product_color_id) REFERENCES product_colors(id),
  CONSTRAINT product_options_product_id FOREIGN KEY (product_id) REFERENCES products(id)
)

-- migrate:down
DROP TABLE product_options;

