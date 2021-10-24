const UsersCollection = require('../model/usersCollection-model')

async function getCollectionById(id) {
    const collection = await UsersCollection.findById(id)
    return collection.users
        
}

async function getAllPost(id,id2) {
    const groupDocument = await getCollectionById(id)
    const group = groupDocument.find(({id}) => id === id2)
    const posts = group.posts
    return posts
    
}

module.exports = getAllPost;
// getAllPost('5ff6c0867d514016b0b7fc6c', "5ff6c0867d514016b0b7fc6d")