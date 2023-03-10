-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(60, 2) NOT NULL,
  discount_rate INT,
  image_url VARCHAR(1000) NOT NULL,
  product_status_id INT NOT NULL, 
  product_gender_id INT NOT NULL, 
  product_category_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT products_product_status_id FOREIGN KEY (product_status_id) REFERENCES product_statuses(id),
  CONSTRAINT products_product_gender_id FOREIGN KEY (product_gender_id) REFERENCES product_genders(id),
  CONSTRAINT products_product_category_id FOREIGN KEY (product_category_id) REFERENCES product_categories(id)
)

-- migrate:down
DROP TABLE products;