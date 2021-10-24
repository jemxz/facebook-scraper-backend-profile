const UsersCollection = require('../model/usersCollection-model')

async function getFull() {
    const collection = await UsersCollection.find()
    return collection
        
}

module.exports = getFull