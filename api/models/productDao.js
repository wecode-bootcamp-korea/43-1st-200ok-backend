const dbDataSource = require("./dataSource");

const getProductsGenderStatusCategory = async (condition) => {
  let gender = condition.gender;
  let status = condition.status;
  let category = condition.category;
  let productId = condition.id;

  if (gender == "male") {
    gender = 1;
  } else if (gender == "female") {
    gender = 2;
  } else if (gender == "malefemale") {
    gender = 3;
  }
  // console.log(gender, status, category, productId);
  // const Gender = {
  //   male: 1,
  //   female: 2,
  //   malefemale: 3,
  // };
  // function changeGenderNumber(gender) {
  //   switch (gender) {
  //     case Gender.male:
  //       gender = 1;
  //       break;
  //     case Gender.female:
  //       gender = 2;
  //       break;
  //     case Gender.malefemale:
  //       gender = 3;
  //       break;
  //   }
  // }
  // gender = changeGenderNumber(gender);

  if (status == "best") {
    status = 1;
  } else if (status == "new") {
    status = 2;
  }
  // const Status = {
  //   best: 1,
  //   new: 2,
  // };
  // function changeStatusNumber(status) {
  //   switch (status) {
  //     case Status.best:
  //       gender == 1;
  //       break;
  //     case Status.new:
  //       gender == 2;
  //       break;
  //   }
  // }
  // status = changeStatusNumber(status);

  if (category == "outer") {
    category = 1;
  } else if (category == "top") {
    category = 2;
  } else if (category == "bottom") {
    category = 3;
  }
  // const Category = {
  //   outer: 1,
  //   top: 2,
  //   bottom: 3,
  // };
  // function changeCategoryNumber(category) {
  //   switch (category) {
  //     case Category.outer:
  //       gender == 1;
  //       break;
  //     case Category.top:
  //       gender == 2;
  //       break;
  //     case Category.bottom:
  //       gender == 2;
  //       break;
  //   }
  // }
  // category = changeCategoryNumber(category);

  let whereClause = "";

  if (gender == "blank") {
    whereClause = whereClause;
  } else {
    if (gender == 3) {
      whereClause = whereClause;
    } else {
      if (whereClause == "") {
        whereClause = whereClause + `WHERE (pg.id = ${gender})`;
      } else {
        whereClause = whereClause + ` AND (pg.id = {$gender})`;
      }
    }
  }
  console.log(whereClause);

  if (status == "blank") {
    whereClause = whereClause;
  } else {
    if (whereClause == "") {
      whereClause = whereClause + `WHERE (ps.id = ${status})`;
    } else {
      whereClause = whereClause + ` AND (ps.id = ${status})`;
    }
  }
  console.log(whereClause);

  if (category == "blank") {
    whereClause = whereClause;
  } else {
    if (whereClause == "") {
      whereClause = whereClause + `WHERE (pc.id = ${category})`;
    } else {
      whereClause = whereClause + ` AND (pc.id = ${category})`;
    }
  }
  console.log(whereClause);

  if (productId == "blank") {
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
