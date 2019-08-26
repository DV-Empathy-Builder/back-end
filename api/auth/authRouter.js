const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { checkValidUserData, checkValidUsername } = require('./authMiddleware');
const Users = require('./authModel');

/**
 * @api {post} auth/register Register New User
 * @apiName PostRegister
 * @apiGroup Auth
 * 
 * @apiSuccess {Object} newUser User's id and username.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP 201 Created
 *      {
 *          "user_id": 3,
 *          "username": "abc123"
 *      }
 * 
 * @apiError MissingData The username or password was not submitted.
 * @apiError TakenUsername  The username is already in use.
 * 
 * @apiErrorExample Error-Response
 *      HTTP 400 Bad Request
 *      {
 *          "error": "Please send both username and password."
 *      }
 * 
 * @apiSampleRequest url
 */
router.post(
    '/register',
    checkValidUserData,
    checkValidUsername,
    async (req, res, next) => {
        try {
            console.log('inside try')
            const user = req.body;
            console.log('got user', user)
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            console.log('got password', hash)
            const newUser = await Users.insert(user);
            console.log('did insert')
            res.status(201).json({user_id: newUser.user_id, username: newUser.username});
        } catch (err) {
            console.log('inside catch')
            next({
                err,
                stat: 500,
                message: 'Error occurred during registration.',
            });
        }
    }
);

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

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
