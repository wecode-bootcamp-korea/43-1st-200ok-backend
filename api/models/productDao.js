const dbDataSource = require("./dataSource");

const getProductsGenderStatusCategory = async (condition) => {
  let gender = condition.gender.toUpperCase();
  let status = condition.status.toUpperCase();
  let category = condition.category.toUpperCase();
  let productId = condition.id.toUpperCase();

  console.log(gender, status, category, productId);

  const genderEnum = Object.freeze({
    MALE: 1,
    FEMALE: 2,
    MALEFEMALE: 3,
  });
  gender = genderEnum[gender];

  const statusEnum = Object.freeze({
    BEST: 1,
    NEW: 2,
  });
  status = statusEnum[status];

  const categoryEnum = {
    OUTER: 1,
    TOP: 2,
    BOTTOM: 3,
  };
  category = categoryEnum[category];

  let whereClause = "";

  if (gender == "BLANK") {
    whereClause = whereClause;
  } else {
    if (gender == 3) {
      whereClause = whereClause;
    } else {
      if (whereClause == "") {
        whereClause = whereClause + `WHERE (pg.id = ${gender})`;
      } else {
        whereClause = whereClause + ` AND (pg.id = ${gender})`;
      }
    }
  }
  console.log(whereClause);

  if (status == "BLANK") {
    whereClause = whereClause;
  } else {
    if (whereClause == "") {
      whereClause = whereClause + `WHERE (ps.id = ${status})`;
    } else {
      whereClause = whereClause + ` AND (ps.id = ${status})`;
    }
  }
  console.log(whereClause);

  if (category == "BLANK") {
    whereClause = whereClause;
  } else {
    if (whereClause == "") {
      whereClause = whereClause + `WHERE (pc.id = ${category})`;
    } else {
      whereClause = whereClause + ` AND (pc.id = ${category})`;
    }
  }
  console.log(whereClause);

  if (productId == "BLANK") {
    whereClause = whereClause;
  } else {
    if (whereClause == "") {
      whereClause = whereClause + `WHERE (p.id = ${id})`;
    } else {
      whereClause = whereClause + ` AND (p.id = ${productId})`;
    }
  }
  console.log(whereClause);

  const result = await dbDataSource.query(
    `
    SELECT
    p.id,
    p.name,
    p.price,
    p.discount_rate,
    (1-0.01*p.discount_rate)*p.price as discounted_price,
    p.image_url,
    (
        SELECT JSON_ARRAYAGG(color)
        FROM (
            SELECT DISTINCT pcc.color
            FROM product_options po
            JOIN product_colors pcc ON po.product_color_id = pcc.id
            WHERE po.product_id = p.id
        ) colors
    ) as colors,
    (
        SELECT JSON_ARRAYAGG(size)
        FROM (
            SELECT DISTINCT pss.size
            FROM product_options po
            JOIN product_sizes pss ON po.product_size_id = pss.id
            WHERE po.product_id = p.id
        ) sizes
    ) as sizes
FROM
    products p
JOIN product_genders pg ON p.product_gender_id = pg.id
JOIN product_statuses ps ON p.product_status_id = ps.id
JOIN product_categories pc ON p.product_category_id = pc.id
${whereClause}
GROUP BY
    p.id
    `
  );

  return result;
};

module.exports = {
  getProductsGenderStatusCategory,
};
