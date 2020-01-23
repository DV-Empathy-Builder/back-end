const router = require('express').Router();

const Categories = require('./categoriesModel');
const {
    validCategoryData,
    validCategoryID,
    validateOwnerID,
} = require('./categoriesMiddleware');

router.use('/:id', validCategoryID, validateOwnerID);

/**
 * @api {get} categories/ Get all categories
 * @apiName GetCategories
 * @apiGroup Categories
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} category Array of category objects
 *@apiSuccess (200) {Number} category.category_id ID of category
 *@apiSuccess (200) {String} category.category_name Name of category
 *@apiSuccess (200) {String} category.category_type Either personal or relocation
 *@apiSuccess (200) {Number} category.user_id Either ID of the user or null for default categories
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *      [
 *           {
 *               "category_id": 1,
 *               "category_name": "Car Payment",
 *               "category_type": "Personal",
 *               "user_id": null
 *           },
 *          {
 *              "category_id": 2,
 *              "category_name": "Car Insurance",
 *              "category_type": "Personal",
 *              "user_id": null
 *          },
 *          {
 *              "category_id": 3,
 *              "category_name": "Gas & Car Maintenance",
 *              "category_type": "Personal",
 *              "user_id": null
 *          }
 *      ]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.get('/', async (req, res, next) => {
    try {
        const user_id = req.token.sub;
        const categories = await Categories.getAll(user_id);
        res.status(200).json(categories);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while getting categories.' });
    }
});
/**
 * @api {post} categories/ Add a new category
 * @apiName PostCategory
 * @apiGroup Categories
 * @apiParam {String} category_name Category's name
 * @apiParam {String} category_type Either personal or relocation
 * @apiParamExample Parameters:
 * {
 * "category_name": "Storage unit fees"
 * "category_type": "Relocation"
 * }
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (201) {Object} category Returns the created object
 *@apiSuccess (201) {Number} category.category_id Id of category
 *@apiSuccess (201) {String} category.category_name Name of category
 *@apiSuccess (201) {String} category.category_type Either personal or relocation
 *@apiSuccess (201) {Number} category.user_id Unique ID of user.
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 201 Created
 *      {
 *          "category_id": 24,
 *          "category_name": "Test234",
 *          "category_type": "Personal",
 *          "user_id": 1
 *       }
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.post('/', validCategoryData, async (req, res, next) => {
    try {
        const newCategory = req.body;
        newCategory.category_name =
            newCategory.category_name[0].toUpperCase() +
            newCategory.category_name.slice(1);
        newCategory.user_id = req.token.sub;
        const category = await Categories.insert(newCategory);
        res.status(201).json(category);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while adding a category.' });
    }
});
/**
 * @api {put} categories/:id Edit a specific category
 * @apiName PutCategory
 * @apiGroup Categories
 * @apiParam {Number} ID Category's unique ID
 *  @apiParam  {String} category_name Category's name
 * @apiParam {String} category_type Either personal or relocation
 * @apiParamExample Parameters:
 * ID: 5
 * {
 * "category_name": "Storage unit fees"
 * "category_type": "Relocation"
 * }
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} category Array of category objects
 *@apiSuccess (200) {Number} category.category_id ID of category
 *@apiSuccess (200) {String} category.category_name Name of category
 *@apiSuccess (200) {String} category.category_type Either personal or relocation
 *@apiSuccess (200) {Number} category.user_id Either ID of the user or null for default categories
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *      [
 *           {
 *               "category_id": 1,
 *               "category_name": "Car Payment",
 *               "category_type": "Personal",
 *               "user_id": null
 *           },
 *          {
 *              "category_id": 2,
 *              "category_name": "Car Insurance",
 *              "category_type": "Personal",
 *              "user_id": null
 *          },
 *          {
 *              "category_id": 3,
 *              "category_name": "Gas & Car Maintenance",
 *              "category_type": "Personal",
 *              "user_id": null
 *          }
 *      ]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.put('/:id', validCategoryData, async (req, res, next) => {
    try {
        const category = req.body;
        const id = req.params.id;
        const categories = await Categories.update(category, id, req.token.sub);
        res.status(200).json(categories);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while updating a category.' });
    }
});
/**
 * @api {delete} categories/:id Delete a specific category
 * @apiName DeleteCategory
 * @apiGroup Categories
 *  @apiParam {Number} ID Category's ID
 * @apiParamExample Parameters:
 * ID: 5
 *@apiHeader {String} authorization User's unique authorization token
 *@apiHeaderExample {json} Header-Example:
 * {
 *    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *}
 * @apiSuccess (200) {Object[]} category Array of category objects
 *@apiSuccess (200) {Number} category.category_id ID of category
 *@apiSuccess (200) {String} category.category_name Name of category
 *@apiSuccess (200) {String} category.category_type Either personal or relocation
 *@apiSuccess (200) {Number} category.user_id Either ID of the user or null for default categories
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 200 OK
 *      [
 *           {
 *               "category_id": 1,
 *               "category_name": "Car Payment",
 *               "category_type": "Personal",
 *               "user_id": null
 *           },
 *          {
 *              "category_id": 2,
 *              "category_name": "Car Insurance",
 *              "category_type": "Personal",
 *              "user_id": null
 *          },
 *          {
 *              "category_id": 3,
 *              "category_name": "Gas & Car Maintenance",
 *              "category_type": "Personal",
 *              "user_id": null
 *          }
 *      ]
 *
 * @apiError (400) MissingToken Must include token with this request.
 * @apiError (401) InvalidToken Must include a valid token.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingToken
 *      {
 *          "error": "No token provided. Please include a token in your authorization header."
 *      }
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const categories = await Categories.remove(id, req.token.sub);
        res.status(200).json(categories);
    } catch (err) {
        next({ err, stat: 500, message: 'Error while deleting a category.' });
    }
});

module.exports = router;
