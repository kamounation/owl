import {OwlFactory} from '../../lib/index.js';

const router = (req, res) => {
  res.send('You have reached this route');
};

const server = new OwlFactory([router], '1000');
server.listen();
