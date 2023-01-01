/* eslint-disable max-classes-per-file */
const OwlFactory = require('../../index');

class TestController {
  getMsg = OwlFactory.catchAsync(async (req, res) => {
    res.json({
      success: true,
      message: "Welcome to this endpoint",
      isOperational: true
    })
  });

  sendMsg = OwlFactory.catchAsync(async (req, res, next) => {
    const { body } = req;
    if (!body.name)
      return next(new OwlFactory.AppRes(OwlFactory.httpStatus.BAD_REQUEST, 'provide a name field in the body object'));

    res.status(200).json(body);
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
  }
}

const server = new OwlFactory([new TestRoute()]);

server.listen();
