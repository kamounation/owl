/* eslint-disable max-classes-per-file */
const { catchAsync, Router, AppRes, httpStatus } = require('../../index');
const Dolph = require('../../index');
const User = require('./model');
const User2 = require('./mySqlModel');
const sequelize = require('./mysqldbConf');

class TestController {
  getMsg = catchAsync(async (req, res) => {
    res.json({
      message: 'Welcome to this endpoint',
    });
  });

  getData = catchAsync(async (req, res) => {
    const data = await User.find({}).lean();
    res.json(data);
  });

  sendMsg = catchAsync(async (req, res, next) => {
    const { body } = req;
    if (!body.name) return next(new AppRes(httpStatus.BAD_REQUEST, 'provide a name field in the body object'));
    const user = await User.create(body);
    res.status(200).json(user);
  });

  sendMsgMysql = catchAsync(async (req, res, next) => {
    const { body } = req;
    if (!body.name) return next(new AppRes(httpStatus.BAD_REQUEST, 'provide a name field in the body object'));
    const user = await User2.create(body);
    res.status(200).json(user);
  });
}

class TestRoute {
  path = '/test';

  router = Router();

  controller = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getMsg);
    this.router.get(`${this.path}/data`, this.controller.getData);
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
const routes = [new TestRoute()];
// It is recommended to attach other services using prototyping
//  in order not to crowd the constructor initiaizer
const dolph = new Dolph(routes, '1313', 'development');
dolph.initMongo(mongoConfig);
dolph.initExternalMiddleWares([]);
dolph.listen();
// // In order to make use of another datbase you call it directly
// sequelize
//   .sync()
//   // eslint-disable-next-line no-unused-vars
//   .then((result) => {
//     dolph.listen();
//   })
//   .catch((err) => {
//     logger.error(err);
//   });
