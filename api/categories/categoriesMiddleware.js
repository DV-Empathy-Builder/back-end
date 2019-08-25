const Categories = require('./categoriesModel');

module.exports = {
    validCategoryData,
    validCategoryID,
};

async function validCategoryData(req, res, next) {
    const category = req.body;
    if (req.method === 'POST') {
        const storedCategory = await Categories.findByName(req.body);
        if (
            storedCategory &&
            storedCategory.category_name.toLowerCase() ===
                req.body.category_name.toLowerCase()
        )
            next({ stat: 400, message: 'This category already exists.' });
    }
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
