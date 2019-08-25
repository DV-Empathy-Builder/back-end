const db = require('../../data/dbConfig');

module.exports = {
    getAll,
    findById,
    findByName,
    insert,
    update,
    remove,
};

function getAll() {
    return db('categories');
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

function update(category, id) {
    return db('categories')
        .where({ category_id: id })
        .update(category)
        .then(() => getAll());
}

function remove(id) {
    return db('categories')
        .where({ category_id: id })
        .delete()
        .then(() => getAll());
}
