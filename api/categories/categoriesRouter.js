const router = require('express').Router();

const Categories = require('./categoriesModel');
const {
    validCategoryData,
    validCategoryID,
    validateOwnerID
} = require('./categoriesMiddleware');

router.use('/:id', validCategoryID, validateOwnerID);

router.get('/', async (req, res, next) => {
    try {
        const user_id = req.token.subject;
        const categories = await Categories.getAll(user_id);
        res.status(200).json(categories);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while getting categories.' });
    }
});

router.post('/', validCategoryData, async (req, res, next) => {
    try {
        const newCategory = req.body;
        newCategory.category_name =
            newCategory.category_name[0].toUpperCase() +
            newCategory.category_name.slice(1);
        newCategory.user_id = req.token.subject
        const category = await Categories.insert(newCategory);
        res.status(201).json(category);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while adding a category.' });
    }
});

router.put('/:id', validCategoryData, async (req, res, next) => {
    try {
        const category = req.body;
        const id = req.params.id;
        const categories = await Categories.update(category, id, req.token.subject);
        res.status(200).json(categories);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while updating a category.' });
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const categories = await Categories.remove(id, req.token.subject);
        res.status(200).json(categories);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while deleting a category.' });
    }
});

module.exports = router;
