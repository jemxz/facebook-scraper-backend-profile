const UsersCollection = require('../model/usersCollection-model')


    async function getCollectionById(id) {
        const collection = await UsersCollection.findById(id)
        return collection.users
    }
    async function getDateById(id) {
        const collection = await UsersCollection.findById(id)
        return collection.date
    }
    
    async function getGroupsAndDatesOnly(id) {
        const result =  await getCollectionById(id)
        const date =  await getDateById(id)
        const items = []
        await Promise.all(result.map(async e => {
            const obj = {
                _id: e._id,
                name: e.name,
                numberOfFollowers: e.numberOfFollowers,
                about: e.about,
                facebookLink: e.facebookLink,
                date: date,
                postLength: e.posts.length
            }
            items.push(obj)
        }))
        return(items);
    }
    

module.exports = getGroupsAndDatesOnly;
// getGroupsOnly('60582afd3d213515d80e42d3')