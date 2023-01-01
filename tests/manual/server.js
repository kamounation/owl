/* eslint-disable max-classes-per-file */
const OwlFactory = require('../../index');

class TestController {
  getMsg = OwlFactory.catchAsync(async (req, res) => {
    res.send('welcome to this endpoint');
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
  }
}

const server = new OwlFactory([new TestRoute()]);

server.listen();
