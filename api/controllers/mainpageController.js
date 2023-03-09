const { mainpageService } = require("../services");
const { catchAsync } = require("../utils/error");

const getBestMans = catchAsync(async (req, res) => {
  const products = await mainpageService.getBestMans();
  return res.status(200).json({ data: products });
});

const getBestWomans = catchAsync(async (req, res) => {
  const products = await mainpageService.getBestWomans();
  return res.status(200).json({ data: products });
});

const getNews = catchAsync(async (req, res) => {
  const products = await mainpageService.getNews();
  return res.status(200).json({ data: products });
});

const getMans = catchAsync(async (req, res) => {
  const products = await mainpageService.getMans();
  return res.status(200).json({ data: products });
});

const getWomans = catchAsync(async (req, res) => {
  const products = await mainpageService.getWomans();
  return res.status(200).json({ data: products });
});

module.exports = {
  getBestMans,
  getBestWomans,
  getNews,
  getMans,
  getWomans,
};
