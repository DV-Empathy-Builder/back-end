const db = require('../../data/dbConfig');

module.exports = {
    getByUserId,
    getById,
};

function getByUserId(id) {
    return db('budget_names').where('user_id', id);
}

function getById(id) {
    return db('stored_budget_lines as s')
        .join('categories as c', 'c.category_id', 's.category_id')
        .select('s.line_id', 's.amount', 'c.category_name')
        .where('s.budget_name_id', id)        
}
