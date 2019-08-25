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
        const budget = await Budgets.getLinesById(id);
        res.status(200).json(budget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error getting a specific budget.' });
    }
});

router.post('/:id/savedBudgets', async (req, res, next) => {
    try {
        const budget_name = req.body.budget_name;
        const user_id = req.params.id;
        const newBudget = { budget_name, user_id };
        const createdBudget = await Budgets.addBudget(newBudget);
        res.status(201).json(createdBudget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error creating a new budget.' });
    }
});

router.post('/:id/savedBudgets/:budgetID/lines', async(req, res, next) => {
    try{
        const lines = req.body.lines;
        const user_id = req.params.id;
        const budgetID = req.params.budgetID
        lines.forEach(line => {
            line.user_id = +user_id;
            line.budget_name_id = +budgetID;
        });
        const fullBudget = await Budgets.addBudgetLines(
            lines,
            budgetID
        );
        res.status(201).json(fullBudget);
    }catch(err){
        next({err, stat: 500, message: 'Error adding budget lines.'})
    }
})

router.delete('/:id/savedBudgets/:budgetID', async (req, res, next) => {
    try {
        const id = req.params.budgetID;
        const remainingBudgets = await Budgets.remove(id, req.params.id);
        res.status(200).json(remainingBudgets);
    } catch (err) {
        next({ err, stat: 500, message: 'Error removing a specific budget.' });
    }
});

router.put('/:id/savedBudgets/:budgetID', async (req, res, next) => {
    try {
        const budget_name = req.body.budget_name;
        const user_id = req.params.id;
        const budgetId = req.params.budgetID;
        const updatedBudget = await Budgets.updateName({budget_name, user_id}, budgetId, user_id)
        res.status(200).json(updatedBudget);
    } catch (err) {
        next({ err, stat: 500, message: 'Error editing a budget.' });
    }
});

router.put('/:id/savedBudgets/:budgetID', async (req, res, next) => {
    try {
        
    } catch (err) {
        next({ err, stat: 500, message: 'Error editing a budget\'s lines.' });
    }
});

module.exports = router;
