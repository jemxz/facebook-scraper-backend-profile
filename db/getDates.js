const UserCollection = require('../model/usersCollection-model')


async function getDate() {
    const collection = await UserCollection.find({}).select('date')
    return collection        
}


module.exports = getDate