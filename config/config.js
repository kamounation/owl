const { config } = require('dotenv');

config({});

const configs = {
  NODE_ENV: process.env.NODE_ENV,
};

const conifgLoader = (param) => {
  configs.NODE_ENV = process.env.NODE_ENV || param;
};

exports.conifgLoader = conifgLoader;
exports.conifgs = configs;
