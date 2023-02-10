/* eslint-disable class-methods-use-this */
const express = require('express');
const httpStatus = require('http-status');
const { connect } = require('mongoose');
// eslint-disable-next-line no-unused-vars
const { Server, IncomingMessage, ServerResponse } = require('http');

// eslint-disable-next-line no-unused-vars
const configs = require('../config/config');
const { morganErrorHandler, successHandler } = require('../config/morgan');
const AppRes = require('./appRes');
const logger = require('../config/logger');
const catchAsync = require('./catchAsync');
const { errorConverter, errorHandler } = require('./error');

let server;

class Dolph {
  app;

  env;

  port;

  /**
   *
   * @param {Array<{path?: string; router:  import("express").Router}>} routes
   * @param {string|number} port
   * @param {string|number} env
   * @param {{mongodbConfig: {url:string, options:Object}}} param3
   */
  constructor(routes, port, env, { mongodbConfig }) {
    this.app = express();
    this.env = env || 'development';
    this.port = port || 8181 || 8080 || 3500;

    this.initializeConfig(env);
    this.initalizeMiddleWares();
    this.initalizeRoutes(routes);
    this.initializeErrorHandlers();
    this.initializeNotFoundHandler();
    this.initClosureHandler();
    this.initDatabase(mongodbConfig);
  }

  /**
   *
   * @returns {Server<typeof IncomingMessage, typeof ServerResponse>}
   */
  listen() {
    server = this.app.listen(this.port, () => {
      logger.info(`App running on ${this.env} environment and  listening on port ${this.port} 🚀`);
    });
    return server;
  }

  initDatabase(config) {
    if (config) {
      if (config?.url !== null) {
        const ustring = config.url.split(':');
        // checks if the connection string is of mongodb
        if (ustring[0] !== 'mongodb') {
          throw new Error(
            "The constructor's optional param supports mongodb database only. To make use of another database then call the function in the index.js or index.ts file like a function Example:`sequelize.sync() ` for mysql`"
          );
        }

        const db = () => {
          try {
            connect(config.url, config.options)
              // eslint-disable-next-line no-unused-vars
              .then((_result) => {
                logger.info('== Mongodb connected ==');
              })
              .catch((err) => {
                logger.error(`MongoErr: ${err}`);
              });
          } catch (error) {
            throw new Error(error);
          }
        };
        db();
      }
    }
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
   * @param {Array<{path?: string; router: import("express").Router}>}  routes
   */
  initalizeRoutes(routes) {
    routes.forEach((route) => {
      // there is a console.log here
      this.app.use('/', route.router);
    });
  }

  initalizeMiddleWares() {
    // can change between testand development depending on the needs.
    if (this.env === 'development') {
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

  initializeConfig(env) {
    configs.conifgLoader(env);
  }

  initializeErrorHandlers() {
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

// eslint-disable-next-line prefer-destructuring
const Router = express.Router;

// eslint-disable-next-line no-multi-assign
exports = module.exports = Dolph;

exports.catchAsync = catchAsync;
exports.logger = logger;
exports.Router = Router;
exports.httpStatus = httpStatus;
exports.AppRes = AppRes;
