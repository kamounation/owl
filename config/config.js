const { config } = require('dotenv');

config({});

const configs = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
};

/**
 *
 * @param {string|number} param
 */
const conifgLoader = (param) => {
  configs.NODE_ENV = process.env.NODE_ENV || param;
  configs.MONGO_URI = process.env.MONGO_URI || param;
};

exports.conifgLoader = conifgLoader;
exports.conifgs = configs;
