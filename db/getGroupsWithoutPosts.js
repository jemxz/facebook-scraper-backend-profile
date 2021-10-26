const UsersCollection = require('../model/usersCollection-model')




    async function getCollectionById(id) {
        const collection = await UsersCollection.findById(id)
        return collection.users
    }
    
    async function getGroupsOnly(id) {
        const result =  await getCollectionById(id)
        const items = []
        await Promise.all(result.map(async e => {
            const obj = {
                _id: e._id,
                name: e.name,
                numberOfFollowers: e.numberOfFollowers,
                about: e.about,
                facebookLink: e.facebookLink
            }
            items.push(obj)
        }))
        return(items);
    }
    

module.exports = getGroupsOnly;
// getGroupsOnly('6155902d183eaf2580687582')