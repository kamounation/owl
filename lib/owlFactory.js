import express, { json, urlencoded } from 'express';
import httpStatus from 'http-status';

import { configs } from '../config/config.js';
import morgan from '../config/morgan.js';
import { ErrorRes } from './errorRes.js';
import { logger } from '../config/logger.js';
import { errorConverter, errorHandler } from './error.js';
import owl from './owl.js';

let server;

export class OwlFactory {
  app;
  port;
  constructor(routes, port) {
    this.app = express();
    this.port = port || 8181;
    this.routes = owl.Router

    this.initalizeMiddleWares();
    this.initalizeRoutes(routes);
    this.initClosureHandler();
  }

  listen() {
    server = this.app.listen(this.port, () => {
      logger.info(`🚀 App running on ${configs.NODE_ENV} environment and  listening on port ${this.port}`);
    });
    return server;
  }

  server() {
    return this.app;
  }

  initalizeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  initalizeMiddleWares() {
    if (configs.NODE_ENV === 'test') {
      this.app.use(morgan.successHandler);
      this.app.use(morgan.errorHandler);
    }

    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use((req, res) => {
      res.status(404).send(new ErrorRes(httpStatus.NOT_FOUND, 'end-point not found'));
    });
    this.app.use(errorConverter);
    this.app.use(errorHandler);
  }

  exitHandler() {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }

  unexpectedErrorHandler = (error) => {
    logger.error(error);
    this.exitHandler();
  };

  initClosureHandler() {
    process.on('uncaughtException', this.unexpectedErrorHandler);
    process.on('unhandledRejection', this.unexpectedErrorHandler);

    process.on('SIGTERM', () => {
      logger.info('SIGTREM received');
      if (server) {
        server.close();
      }
    });
  }
}
