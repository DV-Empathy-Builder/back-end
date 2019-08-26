const router = require('express').Router();

const Budgets = require('./budgetsModel');

//const {validBudgetID, validBudgetName} = require('./budgetsMiddleware');


//router.use('/:id, validBudgetID)

router.get('/', async (req, res, next) => {
    try {
        const user_id = req.token.subject;
        const budgets = await Budgets.getByUserId(user_id);
        let budgetsToReturn = budgets.length < 2 ? budgets[0] : budgets;
        res.status(200).json(budgetsToReturn);
    } catch (err) {
        next({ err, stat: 500, message: 'Error getting saved budgets.' });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const budget = await Budgets.getLinesById(id);
        res.status(200).json(budget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error getting a specific budget.' });
    }
});

router.post('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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

router.put('/:id/lines', async (req, res, next) => {
    try {
        const oldBudget = await Budgets.getLinesById(req.params.id);
        const changes = req.body.lines;
        oldBudget.forEach(async line => {
            let changedLine = changes.find(
                line2 => line.category_id === line2.category_id
            );
            if (line.amount !== changedLine.amount)
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
