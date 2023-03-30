const { Server } = require('socket.io');

module.exports = {
  getIo: (server) => {
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
      allowEIO3: true,
    });
    // eslint-disable-next-line no-shadow
    io.on('connection', (server) => {
      console.log(server);
    });
  },
};
