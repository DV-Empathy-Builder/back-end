const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

const budgetsRouter = require('./budgets/budgetsRouter');
const categoriesRouter = require('./categories/categoriesRouter');
const authRouter = require('./auth/authRouter');
const { restriction } = require('./auth/authMiddleware');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));

//set up routes for auth, categories, budgets
server.use('/auth', authRouter);
server.use('/categories', restriction, categoriesRouter);
server.use('/budgets', restriction, budgetsRouter);

//set up root route for apidocs
const apiDoc = path.join(__dirname, '../apidoc');
server.use('/', express.static(apiDoc));

//set up error handler for final middleware
server.use(errorHandler);
function errorHandler(error, req, res, next) {
    console.log(error.err || error.message);
    res.status(error.stat || 500).json({
        error: error.message || 'Internal server error.',
    });
}

//set up route to handle 404 - MUST BE LAST
server.use('*', (req, res) => {
    res.status(404).send('This page does not exist.');
});

module.exports = server;
