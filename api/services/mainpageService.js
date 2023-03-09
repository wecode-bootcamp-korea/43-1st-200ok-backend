const { mainpageDao } = require("../models");

const getBestMans = async () => {
  return mainpageDao.getBestMans();
};

const getBestWomans = async () => {
  return mainpageDao.getBestWomans();
};

const getNews = async () => {
  return mainpageDao.getNews();
};

const getMans = async () => {
  return mainpageDao.getMans();
};

const getWomans = async () => {
  return mainpageDao.getWomans();
};

module.exports = {
  getBestMans,
  getBestWomans,
  getNews,
  getMans,
  getWomans,
};
