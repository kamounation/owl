const path = require('path');
const httpStatus = require('http-status');
const multer = require('multer');
const defaultAllowedFileExtensions = require('../utils/fileExtensions');
const { ErrorMsgs } = require('./messages/errors');
const AppRes = require('./appRes');

// ||TODO: update mediaparser with other fields and change if/else to switch

/**
 *
 * @param {multer.DiskStorageOptions} storage
 * @param {multer.Options.fileFilter} fileFilter
 * @param {string} fieldname
 * @returns (storage: multer.DiskStorageOptions, fileFilter: multer.Options.fileFilter, fieldname: string) => e.  RequestHandler<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
 *
 * singleUpload is used to upload a single media file
 */
const singleUpload = (storage, fileFilter, fieldname) => {
  const uploadFunc = multer({
    storage: multer.diskStorage(storage),
    fileFilter,
  }).single(fieldname);
  return uploadFunc;
};

/**
 *
 * @param {multer.DiskStorageOptions} storage
 * @param {multer.Options.fileFilter} fileFilter
 * @param {string} fieldnames
 * @param {number} limit
 * @returns (storage: multer.DiskStorageOptions, fileFilter: multer.Options.fileFilter, fieldnames: string, limit: number) => e.RequestHandler<ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
 *
 * arrayUpload is used for uploading multiple media files accessing them with the same name field
 */
const arrayUpload = (storage, fileFilter, fieldnames, limit) => {
  const uploadFunc = multer({
    storage: multer.diskStorage(storage),
    fileFilter,
  }).array(fieldnames, limit);
  return uploadFunc;
};

/**
 *
 * @param {{allowedExtensions?: string[], type:string, storage?: multer.DiskStorageOptions, fieldname: string,limit?:number
 * }} options
 * mediaParser processes media files [built on multer]
 */
const mediaParser = (options) => {
  const { allowedExtensions, type, storage, fieldname, limit } = options;
  let extensions = defaultAllowedFileExtensions;

  if (allowedExtensions) {
    extensions = allowedExtensions;
  }

  const fileFilter = (req, file, callback) => {
    const extensionCheck = extensions.includes(path.extname(file.originalname).toLowerCase());

    if (!extensionCheck && file.originalname !== 'blob') {
      callback(new AppRes(httpStatus.NOT_ACCEPTABLE, ErrorMsgs.FILE_NOT_ACCEPTABLE), false);
    } else {
      callback(null, true);
    }
  };
  if (type === 'single') {
    return singleUpload(storage || {}, fileFilter, fieldname);
  }
  if (type === 'array') {
    return arrayUpload(storage || {}, fileFilter, fieldname, limit || 10);
  }
  if (type !== 'single' || type !== 'array') {
    return function allowAll(req, file, cb) {
      cb(null, true);
    };
  }
};

module.exports = mediaParser;
