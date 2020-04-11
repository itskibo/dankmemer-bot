const randomInt = (min = 0, max = min + 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const utils = {
  randomInt,
  sleep,
};

module.exports = utils;
