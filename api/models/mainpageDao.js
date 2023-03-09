const dbDataSource = require("./dataSource");

const getBestMans = async () => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    (products.product_gender_id = product_genders.id)
    AND
    (product_genders.id = 1)
    JOIN 
    product_bests
    ON
    (product_bests.id = products.product_best_id)
    AND
    (product_bests.id = 1)
    `
  );
  return result;
};

const getBestWomans = async () => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    (products.product_gender_id = product_genders.id)
    AND
    (product_genders.id = 2)
    JOIN
    product_bests
    ON
    (product_bests.id = products.product_best_id)
    AND
    (product_bests.id = 1)
    `
  );
  return result;
};

const getNews = async () => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_news
    ON
    (product_news.id = products.product_new_id)
    AND
    (product_news.id = 1)
    `
  );
  return result;
};

const getMans = async () => {
  const result = await dbDataSource.query(
    `
    SELECT
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    (products.product_gender_id = product_genders.id)
    AND
    (product_genders.id = 1)
    `
  );
  return result;
};

const getWomans = async () => {
  const result = await dbDataSource.query(
    `
        SELECT
        name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
        FROM
        products
        JOIN
        product_genders
        ON
        (products.product_gender_id = product_genders.id)
        AND
        (product_genders.id = 2)
    `
  );
  return result;
};

module.exports = {
  getBestMans,
  getBestWomans,
  getNews,
  getMans,
  getWomans,
};
