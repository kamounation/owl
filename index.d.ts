import { Router as r, Express, NextFunction, Request, Response } from 'express';
import { ServerResponse, IncomingMessage, Server } from 'http';
import { HttpStatus as hps } from 'http-status';
import winston from 'winston';

/**
 * Indicates how the Application routers should be designed
 */
export interface IRoute {
  path?: string;
  router: r;
}

/**
 * Creates an OwlFactory class. The OwlFactory class is a top-level class exported by the OwlFactory module
 */
declare class OwlFactory {
  app: Express;
  env: string | number;
  port: string | number;

  constructor(routes: IRoute[], port?: string | number, env?: string | number);

  /**
   * Starts the application server
   */
  listen(): Server<typeof IncomingMessage, typeof ServerResponse>;

  /**
   * Returns the application server, same this as {app}
   */
  server(): Express;
}

/**
 * Middleware function that passes the constructor code
 */
export var catchAsync: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;

/**
 * Logger for efficiency, better than {console.log()}
 */
export var logger: winston.Logger;

/**
 * express.Router()
 */
export var Router: r;

/**
 * Exposes all the http status'
 */
export var httpStatus: hps;

/**
 * Exposes AppRes which passes errors
 */
export class AppRes extends Error {
  constructor(statusCode: string | number, message: string | number, isOperational: boolean, stack: string);
}
