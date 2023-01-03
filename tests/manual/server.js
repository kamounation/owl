/* eslint-disable max-classes-per-file */
const { logger } = require('../../index');
const OwlFactory = require('../../index');
const User = require('./model');
const User2 = require('./mySqlModel');
const sequelize = require('./mysqldbConf');

class TestController {
  getMsg = OwlFactory.catchAsync(async (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to this endpoint',
      isOperational: true,
    });
  });

  sendMsg = OwlFactory.catchAsync(async (req, res, next) => {
    const { body } = req;
    if (!body.name)
      return next(new OwlFactory.AppRes(OwlFactory.httpStatus.BAD_REQUEST, 'provide a name field in the body object'));
    const user = await User.create(body);
    res.status(200).json(user);
  });

  sendMsgMysql = OwlFactory.catchAsync(async (req, res, next) => {
    const { body } = req;
    if (!body.name)
      return next(new OwlFactory.AppRes(OwlFactory.httpStatus.BAD_REQUEST, 'provide a name field in the body object'));
    const user = await User2.create(body);
    res.status(200).json(user);
  });
}

class TestRoute {
  path = '/test';

  router = OwlFactory.Router();

  controller = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getMsg);
    this.router.post(`${this.path}`, this.controller.sendMsg);
    this.router.post(`${this.path}/mysql`, this.controller.sendMsgMysql);
  }
}

// eslint-disable-next-line no-unused-vars
const mongoConfig = {
  url: 'mongodb://root:password123@localhost:6000',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    dbName: 'owl',
  },
};

const server = new OwlFactory([new TestRoute()], '1313', 'development', { mongodbConfig: null });

// In order to make use of another datbase you call it directly
sequelize
  .sync()
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    server.listen();
  })
  .catch((err) => {
    logger.error(err);
  });
