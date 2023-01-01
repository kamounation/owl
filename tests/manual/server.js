import { OwlFactory } from '../../lib/index.js';
import owl from '../../lib/owl.js';

class TestController {
  constructor() {}

  getMsg = owl.catchAsync(async (req, res, next) => {
    res.send('welcome to this endpoint');
  });
}

class TestRoute {
  path = '/test';
  router = owl.Router();
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
