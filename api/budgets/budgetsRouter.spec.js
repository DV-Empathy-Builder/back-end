const request = require('supertest');
const db = require('../../data/dbConfig');
const server = require('../server');
const Budgets = require('./budgetsModel');

describe('budget router', () => {
    beforeAll(() => {
        return db.seed.run();
    });

    it('should store a token', () => {
        return request(server)
            .post('/auth/login')
            .send({ username: 'test1', password: '1234' })
            .then(res => {
                token = res.body.token;
            });
    });

    describe('get budgets route', () => {
        it('should properly get by user ID', async () => {
            const budgets = await Budgets.getByUserId(1);
            expect(budgets).toHaveLength(1);
        });

        it('should return the budgets', done => {
            return request(server)
                .get('/budgets')
                .set('authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('get budget by ID route', () => {
        it('should properly get lines by ID', async () => {
            const lines = await Budgets.getLinesById(1);
            expect(lines).toHaveLength(22);
        });

        it('should return the lines', done => {
            return request(server)
                .get('/budgets/1')
                .set('authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});
