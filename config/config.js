'use strict';

const { config } = require('dotenv');

config({});

const configs = {
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = configs;
