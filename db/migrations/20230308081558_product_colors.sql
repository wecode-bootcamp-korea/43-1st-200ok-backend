-- migrate:up
CREATE TABLE product_colors(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  color VARCHAR(30) NOT NULL
)

-- migrate:down
<<<<<<<< HEAD:db/migrations/20230310112418_product_colors.sql
DROP TABLE product_colors;
========
DROP TABLE product_colors;
>>>>>>>> main:db/migrations/20230308081558_product_colors.sql
