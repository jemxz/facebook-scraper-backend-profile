const UsersCollection = require('../model/usersCollection-model')


    async function getCollectionById() {
        const collection = await UsersCollection.find()
        return collection
    }

    
    async function getGroupsAndDatesOnly() {
        const result =  await getCollectionById()
        const items = []
        await Promise.all(result.map(async e => {
            e.users.map(async r => {
                const obj = {
                    collectionId: e._id,
                    date: e.date,
                    groupId: r._id,
                    name: r.name,
                    numberOfFollowers: r.numberOfFollowers,
                    about: r.about,
                    facebookLink: r.facebookLink,
                    postLength: r.posts.length
                }
                items.push(obj)
            } )
        }))
        return(items);
    }
    

module.exports = getGroupsAndDatesOnly;
// getGroupsOnly('60582afd3d213515d80e42d3')