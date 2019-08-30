const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { checkValidUserData, checkValidUsername } = require('./authMiddleware');
const Users = require('./authModel');

/**
 * @api {post} auth/register Register new user
 * @apiName PostRegister
 * @apiGroup Auth
 * @apiParam {String} username User's unique username
 * @apiParam {String} password User's password
 * @apiParamExample Parameters:
 * {
 * "username": "test1"
 * "password": "1234"
 * }
 *
 * @apiSuccess (201) {String} user_id User's id
 * @apiSuccess (201) {String} username User's username
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 201 Created
 *      {
 *          "user_id": 3,
 *          "username": "abc123"
 *      }
 *
 * @apiError (400) MissingData The username or password was not submitted.
 * @apiError (400) TakenUsername  The username is already in use.
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingData
 *      {
 *          "error": "Please send both username and password."
 *      }
 */
router.post(
    '/register',
    checkValidUserData,
    checkValidUsername,
    async (req, res, next) => {
        try {
            const user = req.body;
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            const newUser = await Users.insert(user);
            res.status(201).json({
                user_id: newUser.user_id,
                username: newUser.username,
            });
        } catch (err) {
            next({
                err,
                stat: 500,
                message: 'Error occurred during registration.',
            });
        }
    }
);
/**
 * @api {post} auth/login Login registered user
 * @apiName PostLogin
 * @apiGroup Auth
 * @apiParam {String} username User's username
 * @apiParam {String} password User's password
 * @apiParamExample Parameters:
 * {
 * "username": "test1"
 * "password": "1234"
 * }
 *
 * @apiSuccess (200) {String} message Welcome username!
 * @apiSuccess (200) {String} token User's authorization token
 * @apiSuccess (200) {String} user_id User's unique user_id
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP 201 Created
 *      {
 *          "user_id": 3,
 *          "username": "abc123",
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTY3MDE4OTcxLCJleHAiOjE1NjcwMzMzNzF9.75Q_EUManFaIczoccxkSC9LgFRm-zC5w3eeAHuhIWsg"
 *      }
 *
 * @apiError (400) MissingData The username or password was not submitted.
 * @apiError (401) InvalidCredentials  Either the username or password is incorrect
 *
 * @apiErrorExample Error-Response
 *      HTTP 400 MissingData
 *      {
 *          "error": "Please send both username and password."
 *      }
 */
router.post('/login', checkValidUserData, async (req, res, next) => {
    try {
        const user = req.body;
        const storedUser = await Users.findByUsername(user.username);
        if (
            storedUser &&
            bcrypt.compareSync(user.password, storedUser.password)
        ) {
            const token = generateToken(storedUser);
            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token,
                user_id: storedUser.user_id,
            });
        } else {
            next({ stat: 401, message: 'Invalid credentials.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error occurred during login.' });
    }
});

function generateToken(user) {
    
    const payload = {
        subject: user.user_id,
        username: user.username,
    };
    
    const options = {
        expiresIn: '4h',
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'testing', options);
}

module.exports = router;
