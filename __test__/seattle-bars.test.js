'use strict';

const superagent = require('superagent');
const server = require('../src/lib/server');

describe('/api/seattlebars', () => {
    beforeAll(server.start);

    test('should respond with 200 status code and a new json note', () => {
        return superagent.post('http://localhost:3000/api/seattlebar')
            .set('Content-Type', 'application/json')
            .send({
                title: 'Canon',
                content: 'Whiskey bar',
            })
            .then((response) => {
                expect(response.status).toEqual(200);
                expect(response.body.content).toEqual('Whiskey bar');
                expect(response.body.title).toEqual('Canon');

                expect(response.body.location).toBeTruthy();
                expect(response.body.id).toBeTruthy();
            });
    });
    test('should respond with 400 status code if there is no title', () => {
        return superagent.post('http://localhost:3000/api/seattlebars')
            .set('Content-Type', 'application/json')
            .send({
                content: 'Whiskey bar',
            })
            .then(Promise.reject)
            .catch((response) => {
                expect(response.status).toEqual(400);
            });
    });

    test('should respond 200, verifying the route is valid', () => {
        return superagent.get('http://localhost:3000/api/seattlebars')
            .then((response) => {
                expect(response.status).toEqual(200);
            });
    });
    test('should respond with 200 if path and query are both valid', () => {
        return superagent.get('http://localhost:3000/api/seattlebars?title=Canon')
            .then((response) => {
                expect(response.status).toEqual(200);
            })
        });
    });
    test('should respond with 200, and removed json seattle bar', () => {
        return superagent.delete('http://localhost:3000/api/seattlebars?title=Cannon')
            .set('Content-Type', 'application/json')
            .then((response) => {
                expect(response.status).toEqual(204);
            });
    });
