const multer = require('multer');
const path = require('path');
const httpStatus = require('http-status');
const AppRes = require('./appRes');
const { ErrorMsgs } = require('./messages/errors');

class MediaProcessor {
  storageOptions;

  fileExtensions;

  /**
   *
   * @param {multer.DiskStorageOptions} storageOptions
   * @param {Array<string>} fileExtensions
   */
  constructor(storageOptions, fileExtensions) {
    this.storageOptions = storageOptions;
    this.fileExtensions = fileExtensions;
  }

  storage = multer.diskStorage(this.storageOptions);

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
  /**
   *
   * @param {string} name
   */
  singleUpload(name) {
    multer({ storage: this.storage, fileFilter: this.fileFilter }).single(name);
  }

  /**
   *
   * @param {string} name
   * @param {number} maxSize
   */
  arrayUpload(name, maxSize) {
    multer({ storage: this.storage, fileFilter: this.fileFilter }).array(name, maxSize);
  }
}

module.exports = MediaProcessor;
