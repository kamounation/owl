const { pathToFileURL } = require('node:url');

const dynamicImport = (path) => import(pathToFileURL(path)).then((module) => module.default);

module.exports = dynamicImport;
