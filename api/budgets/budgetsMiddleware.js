const list = require('badwords-list');

const Budgets = require('./budgetsModel');

module.exports = {
    validBudgetID,
    validBudgetName,
    validateOwnerID,
};

async function validBudgetName(req, res, next) {
    const budget = req.body;
    if (list.array.includes(budget.budget_name))
        next({ stat: 400, message: 'Please use appropriate language.' });
    if (!budget.budget_name)
        next({ stat: 400, message: 'Please include a budget_name.' });
    else next();
}

async function validBudgetID(req, res, next) {
    const { id } = req.params;
    if (!id)
        next({
            stat: 400,
            message: 'Please include an integer for the ID as a param.',
        });

    let budget = await Budgets.findById(id);
    if (budget) next();
    else next({ stat: 400, message: 'Invalid budget ID.' });
}

async function validateOwnerID(req, res, next) {
    const userID = req.token.sub;
    const { id } = req.params;
    const budget = await Budgets.findById(id);
    if (budget.user_id === userID) next();
    else next({ stat: 400, message: 'You can not edit this budget.' });
}
