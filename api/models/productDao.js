const dbDataSource = require("./dataSource");

const getProductsStatusGender = async (condition) => {
  let gender = condition.gender;
  let status = condition.status;
  if (gender == "male") {
    gender = 1;
  } else if (gender == "female") {
    gender = 2;
  }
  if (status == "best") {
    status = 1;
  } else if (status == "new") {
    status = 2;
  }
  const result = await dbDataSource.query(
    `
    SELECT 
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    products.product_gender_id = product_genders.id
    JOIN 
    product_statuses  
    ON
    products.product_status_id=product_statuses.id
    JOIN 
    product_options
    ON 
    product_options.product_id = products.id
    JOIN
    product_colors
    ON 
    product_colors.id = product_options.product_color_id
    JOIN 
    product_sizes
    ON 
    product_sizes.id = product_options.product_size_id
    WHERE
    product_genders.id = ?
    AND
    product_statuses.id = ?
    `,
    [gender, status]
  );
  return result;
};

const getProductsGenderCategory = async (condition) => {
  let gender = condition.gender;
  let category = condition.category;
  if (gender == "male") {
    gender = 1;
  } else if (gender == "female") {
    gender = 2;
  }
  if (category == "outer") {
    category = 1;
  } else if (category == "top") {
    category = 2;
  } else if (category == "bottom") {
    category = 3;
  }
  const result = await dbDataSource.query(
    `
    SELECT 
    name, price, discount_rate, (1-0.01*discount_rate)*price as discounted_price, image_url
    FROM
    products
    JOIN
    product_genders
    ON
    products.product_gender_id = product_genders.id
    JOIN 
    product_categories
    ON
    products.product_category_id=product_categories.id
    WHERE
    product_genders.id = ?
    AND
    product_categories.id = ?
    `,
    [gender, category]
  );
  return result;
};

module.exports = {
  getProductsStatusGender,
  getProductsGenderCategory,
};
