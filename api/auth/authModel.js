const db = require('../../data/dbConfig')

module.exports = {
    insert,
    findByUsername
}

function insert(user){
    return db('users').insert(user, "user_id").then(([id]) => findById(id))
}

function findById(id){
    return db('users').where({user_id: id}).first()
}

function findByUsername(username){
    try{
        return db('users').where({username}).first()
    } catch(err){
        res.status(599).json({message:'I hate heroku.' });
    }
}