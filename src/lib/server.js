'use strict';

const http = require('http'); // used to create a basic server and add a listener
const logger = require('./logger'); // logs user interactions with the site
const router = require('./router'); // execute request handlers.
require('../routes/seattle-bars-router'); // this connects with the routes

const app = http.createServer(router.findAndExecuteRoutes); // this is the main function that will
// run every request
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
server.stop = () =>{

}
