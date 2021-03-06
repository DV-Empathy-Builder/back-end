const request = require('supertest');
const db = require('../../data/dbConfig');
const server = require('../server');
const Users = require('../auth/authModel');
const bcrypt = require('bcryptjs');

describe('auth router', () => {
    beforeAll(() => {
        return db.seed.run();
    });

    describe('register route', () => {
        it('should properly add to User db', async () => {
            const newUser = { username: 'Ethan', password: '1234' };
            const user = await Users.insert(newUser);
            expect(user).toEqual(
                expect.objectContaining({
                    username: 'Ethan',
                    user_id: expect.any(Number),
                })
            );
        });

        it('should return the new User', done => {
            return request(server)
                .post('/auth/register')
                .send({ username: 'test4', password: '1234' })
                .expect('Content-Type', /json/)
                .expect(201, done);
        });
    });

    describe('login route', () => {
        it('db should find by username', async () => {
            const user = await Users.findByUsername('test1');
            expect(user).toEqual(
                expect.objectContaining({
                    username: 'test1',
                    password: expect.any(String),
                })
            );
        });

        it('should return 401 with invalid creds', async () => {
            const res = await request(server)
                .post('/auth/login')
                .send({ username: 'Bill', password: '123' });
            expect(res.status).toBe(401);
        });

        it('should return message and token on valid creds', async () => {
            const res = await request(server)
                .post('/auth/login')
                .send({ username: 'test1', password: '1234' })
                .then(res => {
                    token = res.body.token;
                    response = res;
                });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: `Welcome test1!`,
                    token: expect.any(String),
                    user_id: expect.any(Number),
                })
            );
        });
    });
});
