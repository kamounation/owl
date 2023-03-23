const multer = require('multer');
const path = require('path');
const httpStatus = require('http-status');
const AppRes = require('./appRes');
const { ErrorMsgs } = require('./messages/errors');
const defaultAllowedFileExtensions = require('../utils/fileExtensions');

class MediaParser {
  name;

  maxSize;

  fileExtensions;

  storage;

  /**
   *
   * @param { { name: string, fileExtensions?: string[], storage?:object, maxSize?:number }} options
   */
  constructor(options) {
    this.name = options.name;
    this.maxSize = options.maxSize || 10;
    this.fileExtensions = options.fileExtensions || defaultAllowedFileExtensions;
    this.storage = options.storage || {};
  }

  /**
   *
   * @param {*} req
   * @param {*} file
   * @param {*} callback
   */
  fileFilter(req, file, callback) {
    const fileExtCheck = this.fileExtensions.includes(path.extname(file.originalname).toLowerCase());

    if (!fileExtCheck && file.originalname !== 'blob') {
      callback(new AppRes(httpStatus.NOT_ACCEPTABLE, ErrorMsgs.FILE_NOT_ACCEPTABLE), false);
    } else {
      callback(null, true);
    }
  }

  singleUpload = multer({ storage: this.storage, fileFilter: this.fileFilter }).single(this.name);

  arrayUpload = multer({ storage: this.storage, fileFilter: this.fileFilter }).array(this.name, this.maxSize);
}

// // eslint-disable-next-line no-multi-assign
// exports = module.exports = mediaParser;
// exports.singleUpload = singleUpload;
// exports.arrayUpload = arrayUpload;

module.exports = MediaParser;
