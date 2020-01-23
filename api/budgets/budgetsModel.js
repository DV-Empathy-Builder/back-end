const db = require('../../data/dbConfig');

module.exports = {
    getByUserId,
    getLinesById,
    remove,
    addBudget,
    addBudgetLines,
    updateName,
    updateLines,
    findById,
};

function getByUserId(id) {
    return db('budget_names').where('user_id', id);
}

function getLinesById(id) {
    return db('stored_budget_lines as s')
        .join('categories as c', 'c.category_id', 's.category_id')
        .select('s.line_id', 's.amount', 'c.category_id', 'c.category_name')
        .where('s.budget_name_id', id);
}

function remove(id, user_id) {
    return db('budget_names')
        .where({ budget_name_id: id })
        .delete()
        .then(() => getByUserId(user_id));
}

function findById(id) {
    return db('budget_names')
        .where('budget_name_id', id)
        .first();
}

function addBudget(budget) {
    return db('budget_names')
        .insert(budget, 'budget_name_id')
        .then(([id]) => findById(id));
}

function addBudgetLines(lines, id) {
    return db('stored_budget_lines')
        .insert(lines)
        .then(() => getLinesById(id));
}

function updateName(changes, id, user_id) {
    return db('budget_names')
        .where('budget_name_id', id)
        .update(changes)
        .then(() => getByUserId(user_id));
}

function updateLines(changes) {
    return db('stored_budget_lines as s')
        .where('s.line_id', changes.line_id)
        .update(changes);
}
