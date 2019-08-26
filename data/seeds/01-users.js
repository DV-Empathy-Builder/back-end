const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
    return knex('users').insert([
        { username: 'test1', password: bcrypt.hashSync('1234', 10) },
        { username: 'test2', password: bcrypt.hashSync('1234', 10) },
        { username: 'test3', password: bcrypt.hashSync('1234', 10) },
    ]);
};
