'use strict';

const SeattleBars = require('../model/seattlebar');
const app = require('../lib/router');
const logger = require('../lib/logger');

const barStorage = [];

const sendStatus = (statusCode, message, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status code due to ${message}`);
  response.writeHead(statusCode);
  response.end();
};

const sendJSON = (statusCode, data, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status and the following data`);
  logger.log(logger.INFO, JSON.stringify(data));

  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(data));
  response.end();
};

app.post('/api/seattlebar', (request, response) => {
  //----------------------------------------------------------------------------------
  // REQUEST VALIDATION
  //----------------------------------------------------------------------------------
  if (!request.body) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }
  if (!request.body.title) {
    sendStatus(400, 'title not found', response);
    return undefined;
  }

  if (!request.body.content) {
    sendStatus(400, 'content not found', response);
    return undefined;
  }
  //----------------------------------------------------------------------------------
  // NOTE CREATION
  //----------------------------------------------------------------------------------
  const seattleBars = new SeattleBars(request.body.title, request.body.content);
  barStorage.push(seattleBars);
  sendJSON(200, seattleBars, response);
  return undefined;
});

app.get('/api/seattlebar/', (request, response) => {
  sendStatus(200, 'This path exist', response);
  return undefined;
});
app.delete('/api/seattlebar/', (request, response) => {
  barStorage.splice(barStorage.indexOf(request.url.query(request)), 1);
  sendStatus(204, `${request.url.query(request)} no longer exists.`, response);
  return undefined;
});
