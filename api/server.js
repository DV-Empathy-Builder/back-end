const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const apiDoc = path.join(__dirname, '../apidoc');

const budgetsRouter = require('./budgets/budgetsRouter');
const categoriesRouter = require('./categories/categoriesRouter');
const authRouter = require('./auth/authRouter');
const { restriction } = require('./auth/authMiddleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/auth', authRouter);
server.use('/categories', restriction, categoriesRouter);
server.use('/budgets', restriction, budgetsRouter);

server.use('/', express.static(apiDoc));

server.use('/:anything', (req, res) => {
    res.status(404).json("This page does not exist.")
})

server.use(errorHandler);

function errorHandler(error, req, res, next) {
    console.log(error.err || error.message);
    res.status(error.stat || 500).json({
        error: error.message || 'Internal server error.',
    });
}

module.exports = server;
