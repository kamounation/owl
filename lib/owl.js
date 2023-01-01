import httpStatus from 'http-status';
import { Router } from 'express';
import { logger } from '../config/logger.js';
import { AppRes } from './appRes.js';
import { catchAsync } from '../lib/catchAsync.js';
import { pick } from '../utils/pick.js';

const owl = {
  httpStatus,
  logger,
  AppRes,
  catchAsync,
  Router,
  pick,
};

export default owl;
