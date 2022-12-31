/**@typedef {import('../lib/index')} */
import { config } from 'dotenv';

config({});

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
};
