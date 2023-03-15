-- migrate:up
CREATE TABLE product_categories(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(30) NOT NULL
)

-- migrate:down
<<<<<<<< HEAD:db/migrations/20230310112348_product_categories.sql
DROP TABLE product_categories;
========
DROP TABLE product_categories;
>>>>>>>> main:db/migrations/20230308081546_product_categories.sql
