-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(100, 2) NOT NULL,
  discount_rate INT
  image_url VARCHAR(1000) NOT NULL,
  products_color_id INT NOT NULL,
  products_size_id INT NOT NULL,
  products_gender_id INT NOT NULL, 
  products_type_id INT NOT NULL,
  CONSTRAINT products_products_color_products_color_id FOREIGN KEY (products_color_id) REFERENCES products_color(id),
  CONSTRAINT products_products_size_products_size_id FOREIGN KEY (products_size_id) REFERENCES products_size(id),
  CONSTRAINT products_products_gender_products_gender_id FOREIGN KEY (products_gender_id) REFERENCES products_gender(id),
  CONSTRAINT products_products_type_products_type_id FOREIGN KEY (products_type_id) REFERENCES products_type(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down

