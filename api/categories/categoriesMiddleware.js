const Categories = require('./categoriesModel');

module.exports = {
    validCategoryData,
    validCategoryID,
    validateOwnerID
};

async function validCategoryData(req, res, next) {
    const category = req.body;
    if (!category.category_name)
        next({ stat: 400, message: 'Please include a category_name.' });
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

async function validateOwnerID(req, res, next){
    const userID = req.token.subject;
    const id = req.params.id;
    const category = await Categories.findById(id)
    if(category.user_id === userID)
        next()
    else    
        next({stat:400, message: 'You can not edit this category.'})
}
