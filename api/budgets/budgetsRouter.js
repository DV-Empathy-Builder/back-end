const router = require('express').Router();

const Budgets = require('./budgetsModel');

const {
    validBudgetID,
    validBudgetName,
    validateOwnerID,
} = require('./budgetsMiddleware');

router.use('/:id', validBudgetID, validateOwnerID);
/**
 * @api {get} budgets/ Get all budgets
 * @apiName GetBudgets
 * @apiGroup Budgets
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} budget Array of budget objects
 *@apiSuccess (200) {Number} budget.budget_name_id ID of budget
 *@apiSuccess (200) {Date} budget.created_at Date budget was created
 *@apiSuccess (200) {Date} budget.updated_at Date budget was updated
 *@apiSuccess (200) {Number} budget.user_id ID of the user owning the budget
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *[
 *    {
 *        "budget_name_id": 1,
 *        "budget_name": "Denver",
 *        "created_at": "2019-08-26T19:49:28.206Z",
 *        "updated_at": "2019-08-26T19:49:28.206Z",
 *        "user_id": 1
 *    }
 *]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.get('/', async (req, res, next) => {
    try {
        const user_id = req.token.subject;
        const budgets = await Budgets.getByUserId(user_id);
        res.status(200).json(budgets);
    } catch (err) {
        next({ err, stat: 500, message: 'Error getting saved budgets.' });
    }
});
/**
 * @api {get} budgets/:id Get all lines for specific budget
 * @apiName GetBudgetLines
 * @apiGroup Budgets
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} budget Array of line objects
 *@apiSuccess (200) {Number} budget.line_id ID of line
 *@apiSuccess (200) {Date} budget.amount Amount allocated for line
 *@apiSuccess (200) {Date} budget.category_id ID of category line is connected to
 *@apiSuccess (200) {Number} budget.category_name Name of category line is connected to
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *[
 *    {
 *        "line_id": 1,
 *        "amount": 80,
 *        "category_id": 1,
 *        "category_name": "Car Payment"
 *    },
 *    {
 *        "line_id": 4,
 *        "amount": 0,
 *        "category_id": 2,
 *        "category_name": "Car Insurance"
 *    },
 *    {
 *        "line_id": 7,
 *        "amount": 0,
 *        "category_id": 3,
 *        "category_name": "Gas & Car Maintenance"
 *    },
 *]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const budget = await Budgets.getLinesById(id);
        res.status(200).json(budget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error getting a specific budget.' });
    }
});
/**
 * @api {post} budgets/ Post new budget
 * @apiName PostBudgets
 * @apiGroup Budgets
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object} budget Newly created budget object
 *@apiSuccess (200) {Number} budget.budget_name_id ID of budget
 *@apiSuccess (200) {Date} budget.created_at Date budget was created
 *@apiSuccess (200) {Date} budget.updated_at Date budget was updated
 *@apiSuccess (200) {Number} budget.user_id ID of the user owning the budget
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *
 *    {
 *        "budget_name_id": 1,
 *        "budget_name": "Denver",
 *        "created_at": "2019-08-26T19:49:28.206Z",
 *        "updated_at": "2019-08-26T19:49:28.206Z",
 *        "user_id": 1
 *    }
 *
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.post('/', validBudgetName, async (req, res, next) => {
    try {
        const budget_name = req.body.budget_name;
        const user_id = req.token.subject;
        const newBudget = { budget_name, user_id };
        const createdBudget = await Budgets.addBudget(newBudget);
        res.status(201).json(createdBudget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error creating a new budget.' });
    }
});
/**
 * @api {post} budgets/:id Create lines for specific budget
 * @apiName PostBudgetLines
 * @apiGroup Budgets
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} budget Array of line objects
 *@apiSuccess (200) {Number} budget.line_id ID of line
 *@apiSuccess (200) {Date} budget.amount Amount allocated for line
 *@apiSuccess (200) {Date} budget.category_id ID of category line is connected to
 *@apiSuccess (200) {Number} budget.category_name Name of category line is connected to
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *[
 *    {
 *        "line_id": 1,
 *        "amount": 80,
 *        "category_id": 1,
 *        "category_name": "Car Payment"
 *    },
 *    {
 *        "line_id": 4,
 *        "amount": 0,
 *        "category_id": 2,
 *        "category_name": "Car Insurance"
 *    },
 *    {
 *        "line_id": 7,
 *        "amount": 0,
 *        "category_id": 3,
 *        "category_name": "Gas & Car Maintenance"
 *    },
 *]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.post('/:id', async (req, res, next) => {
    try {
        const lines = req.body.lines;
        const user_id = req.token.subject;
        const { id } = req.params;
        lines.forEach(line => {
            line.user_id = +user_id;
            line.budget_name_id = +id;
        });
        const fullBudget = await Budgets.addBudgetLines(lines, id);
        res.status(201).json(fullBudget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error adding budget lines.' });
    }
});
/**
 * @api {del} budgets/:id Delete a budget
 * @apiName DelBudgets
 * @apiGroup Budgets
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} budget Array of budget objects
 *@apiSuccess (200) {Number} budget.budget_name_id ID of budget
 *@apiSuccess (200) {Date} budget.created_at Date budget was created
 *@apiSuccess (200) {Date} budget.updated_at Date budget was updated
 *@apiSuccess (200) {Number} budget.user_id ID of the user owning the budget
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *[
 *    {
 *        "budget_name_id": 1,
 *        "budget_name": "Denver",
 *        "created_at": "2019-08-26T19:49:28.206Z",
 *        "updated_at": "2019-08-26T19:49:28.206Z",
 *        "user_id": 1
 *    }
 *]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.token.subject;
        const remainingBudgets = await Budgets.remove(id, user_id);
        res.status(200).json(remainingBudgets);
    } catch (err) {
        next({ err, stat: 500, message: 'Error removing a specific budget.' });
    }
});
/**
 * @api {put} budgets/:id Edit budget name
 * @apiName PutBudgets
 * @apiGroup Budgets
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} budget Array of budget objects
 *@apiSuccess (200) {Number} budget.budget_name_id ID of budget
 *@apiSuccess (200) {Date} budget.created_at Date budget was created
 *@apiSuccess (200) {Date} budget.updated_at Date budget was updated
 *@apiSuccess (200) {Number} budget.user_id ID of the user owning the budget
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *[
 *    {
 *        "budget_name_id": 1,
 *        "budget_name": "Denver",
 *        "created_at": "2019-08-26T19:49:28.206Z",
 *        "updated_at": "2019-08-26T19:49:28.206Z",
 *        "user_id": 1
 *    }
 *]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.put('/:id', validBudgetName, async (req, res, next) => {
    try {
        const budget_name = req.body.budget_name;
        const user_id = req.token.subject;
        const { id } = req.params;
        const updatedBudget = await Budgets.updateName(
            { budget_name, user_id },
            id,
            user_id
        );
        res.status(200).json(updatedBudget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error editing a budget.' });
    }
});
/**
 * @api {put} budgets/:id/lines Edit lines for specific budget
 * @apiName PutBudgetLines
 * @apiGroup Budgets
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} budget Array of line objects
 *@apiSuccess (200) {Number} budget.line_id ID of line
 *@apiSuccess (200) {Date} budget.amount Amount allocated for line
 *@apiSuccess (200) {Date} budget.category_id ID of category line is connected to
 *@apiSuccess (200) {Number} budget.category_name Name of category line is connected to
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *[
 *    {
 *        "line_id": 1,
 *        "amount": 80,
 *        "category_id": 1,
 *        "category_name": "Car Payment"
 *    },
 *    {
 *        "line_id": 4,
 *        "amount": 0,
 *        "category_id": 2,
 *        "category_name": "Car Insurance"
 *    },
 *    {
 *        "line_id": 7,
 *        "amount": 0,
 *        "category_id": 3,
 *        "category_name": "Gas & Car Maintenance"
 *    },
 *]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.put('/:id/lines', async (req, res, next) => {
    try {
        const oldBudget = await Budgets.getLinesById(req.params.id);
        const changes = req.body.lines;
        oldBudget.forEach(async line => {
            let changedLine = changes.find(
                line2 => line.category_id === line2.category_id
            );
            if (changedLine.amount && line.amount !== changedLine.amount)
                await Budgets.updateLines({
                    amount: changedLine.amount,
                    line_id: line.line_id,
                });
        });
        const newBudget = await Budgets.getLinesById(req.params.id);
        res.status(200).json(newBudget);
    } catch (err) {
        next({ err, stat: 500, message: "Error editing a budget's lines." });
    }
});

module.exports = router;
