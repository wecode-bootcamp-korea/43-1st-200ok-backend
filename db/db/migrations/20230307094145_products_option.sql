-- migrate:up
CREATE TABLE products_option(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  products_id INT NOT NULL,
  products_size_id INT NOT NULL,
  products_color_id INT NOT NULL,
  products_gender_id INT NOT NULL,
  products_type_id INT NOT NULL,
  carts_id INT NOT NULL,
  CONSTRAINT products_option_products_products_id FOREIGN KEY (products_id) REFERENCES products(id),
  CONSTRAINT products_option_products_size_products_size_id FOREIGN KEY (products_size_id) REFERENCES products_size(id),
  CONSTRAINT products_option_products_color_products_color_id FOREIGN KEY (products_color_id) REFERENCES products_color(id),
  CONSTRAINT products_option_products_gender_products_gender_id FOREIGN KEY (products_gender_id) REFERENCES products_gender(id),
  CONSTRAINT products_option_products_type_products_type_id FOREIGN KEY (products_type_id) REFERENCES products_type(id),
  CONSTRAINT products_option_carts_carts_id FOREIGN KEY (carts_id) REFERENCES carts(id),
)

-- migrate:down

