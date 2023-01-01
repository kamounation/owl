const OwlFactory = require('../../index.js');

class TestController {
  constructor() {}

  getMsg = OwlFactory.catchAsync(async (req, res, next) => {
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
