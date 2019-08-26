const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path')

const apiDoc = path.join(__dirname, '../apidoc')

const budgetsRouter = require('./budgets/budgetsRouter');
const categoriesRouter = require('./categories/categoriesRouter');
const authRouter = require('./auth/authRouter');
const { restriction } = require('./auth/authMiddleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRouter);
server.use('/categories', restriction, categoriesRouter);
server.use('/users', budgetsRouter);

server.use('/', express.static(apiDoc))

server.use(errorHandler);

function errorHandler(error, req, res, next) {
    console.log(error.err || error.message);
    res.status(error.stat || 500).json({
        error: error.message || 'Internal server error.',
    });
}

module.exports = server;
