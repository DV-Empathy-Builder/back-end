const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    findById,
    findByName,
    insert,
    update,
    remove,
};

function getAll(id) {
    return db('categories').whereNull('user_id').orWhere('user_id', id);
}

function findById(id) {
    return db('categories')
        .where({ category_id: id })
        .first();
}

function findByName(name){
    return db('categories').where(name).first()
}

function insert(category) {
    return db('categories')
        .insert(category)
        .then(([id]) => findById(id));
}

function update(category, id, user_id) {
    return db('categories')
        .where({ category_id: id })
        .update(category)
        .then(() => getAll(user_id));
}

function remove(id, user_id) {
    return db('categories')
        .where({ category_id: id })
        .delete()
        .then(() => getAll(user_id));
}
