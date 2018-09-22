'use strict';

const url = require('url');
const queryString = require('querystring');
const logger = require('./logger');

const requestParser = module.exports = {};

/**
 * Request parser WILL parse the bodies of POST and PUT requests.
 * @param request
 * @returns {Promise<any>}
 */
requestParser.parseAsync = (request) => {
    return new Promise((resolve, reject) => {
        logger.log(logger.INFO, `Original URL: ${request.url}`);

        //! https://nodejs.org/docs/latest/api/url.html
        request.url = url.parse(request.url);
        //! https://nodejs.org/api/querystring.html
        request.url.query = queryString.parse(request.url.query);

        if (request.method !== 'POST' && request.method !== 'PUT') {
            return resolve(request);
        }
        let completeBody = '';
        request.on('data', (buffer) => {
            completeBody += buffer.toString();
        });
        request.on('end', () => {
            try {
                request.body = JSON.parse(completeBody);
                return resolve(request);
            } catch (error) {
                return reject(error);
            }
        });
        return undefined;
    });
};