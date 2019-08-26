const Users = require('./authModel');
const jwt = require('jsonwebtoken');
module.exports = {
    checkValidUsername,
    checkValidUserData,
    restriction,
};

function checkValidUserData(req, res, next) {
    const user = req.body;
    console.log('validData', user)
    if (!user.username || !user.password)
        next({
            stat: 400,
            message: 'Please send both a password and username.',
        });
    else next();
}

async function checkValidUsername(req, res, next) {
    const user = req.body;
    console.log('checkValidUsername')
    const storedUser = await Users.findByUsername(user.username);
    console.log('got storeduser from db', storedUser)
    if (storedUser && user.username === storedUser.username)
        next({
            stat: 400,
            message: 'Username is already taken, please choose another.',
        });
    else next();
}

function restriction(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err)
                next({
                    err,
                    stat: 401,
                    message:
                        'Invalid token, please log in with valid credentials.',
                });
            else req.token = decodedToken;
            next();
        });
    } else
        next({
            stat: 400,
            message:
                'No token provided. Please include a token in your authorization header.',
        });
}
