'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');
require('../routes/seattle-bars-router');

const app = http.createServer(router.findAndExecuteRoutes);
//-------------------------------------------------

const server = module.exports = {};

/**
 *
 * @param port port where we want to start the server
 * @returns the result of app.listen
 */
server.start = (port = 3000) => {
  return app.listen(port, () => {
    logger.log(logger.INFO, `Server is on at PORT: ${port}`);
  });
};

// server.stop = (callback) => {
// };
