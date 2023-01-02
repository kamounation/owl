const express = require('express');
const httpStatus = require('http-status');
// eslint-disable-next-line no-unused-vars
const { Server, IncomingMessage, ServerResponse } = require('http');

// eslint-disable-next-line no-unused-vars
const { Router } = require('express');
const configs = require('../config/config');
const { morganErrorHandler, successHandler } = require('../config/morgan');
const AppRes = require('./appRes');
const logger = require('../config/logger');
const catchAsync = require('./catchAsync');
const { errorConverter, errorHandler } = require('./error');

let server;

class OwlFactory {
  app;

  env;

  port;

  /**
   *
   * @param {Array<{path?: string; router: Router}>} routes
   * @param {string|number} port
   * @param {string|number} env
   */
  constructor(routes, port, env) {
    this.app = express();
    this.env = env || 'development';
    this.port = port || 8181 || 8080 || 3500;

    this.initializeConfig(env);
    this.initalizeMiddleWares();
    this.initalizeRoutes(routes);
    this.initializeErrorHandlers();
    this.initializeNotFoundHandler();
    this.initClosureHandler();
  }

  /**
   *
   * @returns {Server<typeof IncomingMessage, typeof ServerResponse>}
   */
  listen() {
    server = this.app.listen(this.port, () => {
      logger.info(`🚀 App running on ${this.env} environment and  listening on port ${this.port}`);
    });
    return server;
  }

  /**
   *
   * @returns {express.Express}
   */
  server() {
    return this.app;
  }

  /**
   *
   * @param {Array<{path?: string; router: Router}>}  routes
   */
  initalizeRoutes(routes) {
    routes.forEach((route) => {
      // there is a console.log here
      this.app.use('/', route.router);
    });
  }

  initalizeMiddleWares() {
    if (this.env === 'test') {
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

  // eslint-disable-next-line class-methods-use-this
  initializeConfig(env) {
    configs.conifgLoader(env);
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
exports.AppRes = AppRes;
