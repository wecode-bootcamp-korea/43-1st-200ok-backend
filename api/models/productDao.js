const dbDataSource = require("./dataSource");
const Type = require("../utils/enum");

const getProductsGenderStatusCategory = async (condition) => {
  let gender = condition.gender.toUpperCase();
  let status = condition.status.toUpperCase();
  let category = condition.category.toUpperCase();
  let productId = condition.productId.toUpperCase();

  let whereClause = "";

  if (gender == "BLANK") {
    whereClause = whereClause;
  } else {
    gender = await Type.GenderType[gender];
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

  if (status == "BLANK") {
    whereClause = whereClause;
  } else {
    status = await Type.StatusType[status];

    if (whereClause == "") {
      whereClause = whereClause + `WHERE (ps.id = ${status})`;
    } else {
      whereClause = whereClause + ` AND (ps.id = ${status})`;
    }
  }

  if (category == "BLANK") {
    whereClause = whereClause;
  } else {
    category = await Type.CategoryType[category];
    if (whereClause == "") {
      whereClause = whereClause + `WHERE (pc.id = ${category})`;
    } else {
      whereClause = whereClause + ` AND (pc.id = ${category})`;
    }
  }

  if (productId == "BLANK") {
    whereClause = whereClause;
  } else {
    if (whereClause == "") {
      whereClause = whereClause + `WHERE (p.id = ${id})`;
    } else {
      whereClause = whereClause + ` AND (p.id = ${productId})`;
    }
  }

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
