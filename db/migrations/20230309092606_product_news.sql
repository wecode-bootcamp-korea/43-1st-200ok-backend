-- migrate:up
CREATE TABLE product_news(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  new VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE product_news;