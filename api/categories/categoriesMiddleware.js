const list = require('badwords-list');

const Categories = require('./categoriesModel');

module.exports = {
    validCategoryData,
    validCategoryID,
    validateOwnerID,
};

async function validCategoryData(req, res, next) {
    const category = req.body;
    if (list.array.includes(category.category_name))
        next({ stat: 400, message: 'Please use appropriate language.' });
    if (!category.category_name || !category.category_type)
        next({
            stat: 400,
            message: 'Please include a category_name and category_type.',
        });
    else next();
}

async function validCategoryID(req, res, next) {
    const id = req.params.id;
    if (!id)
        next({
            stat: 400,
            message: 'Please include an integer for the ID as a param.',
        });

    let category = await Categories.findById(id);
    if (category) next();
    else next({ stat: 400, message: 'Invalid category ID.' });
}

async function validateOwnerID(req, res, next) {
    const userID = req.token.sub;
    const { id } = req.params;
    const category = await Categories.findById(id);
    if (category.user_id === userID) next();
    else next({ stat: 400, message: 'You can not edit this category.' });
}
