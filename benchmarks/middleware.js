/* eslint-disable max-classes-per-file */
const Dolph = require('..');

let n = parseInt(process.env.MW || '1', 10);
let server;

// eslint-disable-next-line no-console
console.log('  %s middleware', n);

// eslint-disable-next-line no-plusplus
while (n--) {
  class TestRouter {
    path = '/';

    router = Dolph.Router();

    constructor() {
      this.Routes();
    }

    Routes() {
      this.router.use((_req, _res, next) => {
        next();
      });
    }
  }
  server = new Dolph([new TestRouter()], 3100, 'test', { mongodbConfig: null });
}

class TestRouter {
  path = '/';

  router = Dolph.Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.use((_req, res) => {
      res.send('hi, reached');
    });
  }
}

server = new Dolph([new TestRouter()], 3100, 'test', { mongodbConfig: null });

server.listen();
