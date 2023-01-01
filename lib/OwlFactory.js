const express = require('express');
const httpStatus = require('http-status');

const configs = require('../config/config');
const { morganErrorHandler, successHandler } = require('../config/morgan');
const AppRes = require('./appRes');
const logger = require('../config/logger');
const catchAsync = require('./catchAsync');
const { errorConverter, errorHandler } = require('./error');

let server;

class OwlFactory {
  app;

  port;

  constructor(routes, port) {
    this.app = express();
    this.port = port || 8181;

    this.initalizeMiddleWares();
    this.initalizeRoutes(routes);
    this.initializeErrorHandlers();
    this.initializeNotFoundHandler();
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
      // there is a console.log here
      this.app.use('/', route.router);
    });
  }

  initalizeMiddleWares() {
    if (configs.NODE_ENV === 'test') {
      this.app.use(successHandler);
      this.app.use(morganErrorHandler);
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeNotFoundHandler() {
    this.app.use((req, res) => {
      res.status(404).send(new AppRes(httpStatus.NOT_FOUND, 'end-point not found'));
    });
  }

  initializeErrorHandlers() {
    this.app.use(errorConverter);
    this.app.use(errorHandler);
  }

  // eslint-disable-next-line class-methods-use-this
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

// eslint-disable-next-line no-multi-assign
exports = module.exports = OwlFactory;

exports.catchAsync = catchAsync;
exports.logger = logger;
exports.Router = express.Router;
exports.httpStatus = httpStatus;
exports.ApiRes = AppRes;
