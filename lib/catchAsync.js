/**
 *
 * @param {Function} fn
 * @returns {(fn: Function) => (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void}
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
