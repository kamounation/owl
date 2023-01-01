import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { configs } from '../config/config.js';
import { logger } from '../config/logger.js';
import { AppRes } from './appRes.js';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof AppRes)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppRes(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (configs.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(configs.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (configs.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
