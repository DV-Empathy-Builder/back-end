const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { checkValidUserData, checkValidUsername } = require('./authMiddleware');
const Users = require('./authModel');

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
            res.status(201).json(newUser);
        } catch (err) {
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
            const token = generateToken(user);
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
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: '4h',
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
