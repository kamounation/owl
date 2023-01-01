import httpStatus from 'http-status';
import { Router } from 'express';
import { logger } from '../config/logger.js';
import { ErrorRes } from '../lib/errorRes.js';
import { catchAsync } from '../lib/catchAsync.js';
import { pick } from '../utils/pick.js';

const owl = {
  httpStatus,
  logger,
  ErrorRes,
  catchAsync,
  Router,
  pick,
};

export default owl