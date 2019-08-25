const router = require('express').Router();

const Budgets = require('./budgetsModel');

//const {validUserID, validBudgetID} = require('./budgetsMiddleware');

//router.use('/', validUserID)

//router.use('/:id/savedBudgets/:budgetID, validBudgetID)

router.get('/:id/savedBudgets', async (req, res, next) => {
    try {
        const id = req.params.id;
        const budgets = await Budgets.getByUserId(id);
        let budgetsToReturn = budgets.length < 2 ? budgets[0] : budgets;
        res.status(200).json(budgetsToReturn);
    } catch (err) {
        next({ err, stat: 500, message: 'Error getting saved budgets.' });
    }
});

router.get('/:id/savedBudgets/:budgetID', async (req, res, next) => {
    try {
        const id = req.params.budgetID;
        const budget = await Budgets.getById(id);
        res.status(200).json(budget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error getting a specific budget.' });
    }
});

router.post('/:id/savedBudgets', async (req, res, next) => {});

router.delete('/:id/savedBudgets/:budgetID', async (req, res, next) => {
    try {
        const id = req.params.budgetID;
        const amt = await Budgets.remove(id);
        res.status(200).json({ message: `You deleted ${amt} budgets.` });
    } catch (err) {
        next({ err, stat: 500, message: 'Error removing a specific budget.' });
    }
});

router.put('/:id/savedBudgets/:budgetID', async (req, res, next) => {});

module.exports = router;
