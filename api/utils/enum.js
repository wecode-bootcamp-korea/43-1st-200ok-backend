const checkGender = async (gender) => {
  const GenderType = Object.freeze({
    MALE: 1,
    FEMALE: 2,
    MALEFEMALE: 3,
  });
  return GenderType[gender];
};

const checkStatus = async (status) => {
  const StatusType = Object.freeze({
    BEST: 1,
    NEW: 2,
  });
  return StatusType[status];
};

const checkCategory = async (category) => {
  const CategoryType = {
    OUTER: 1,
    TOP: 2,
    BOTTOM: 3,
  };
  return CategoryType[category];
};

module.exports = {
  checkGender,
  checkStatus,
  checkCategory,
};
