const UsersCollection = require('../model/usersCollection-model')

async function getCollectionById(id) {
    const collection = await UsersCollection.findById(id)
    return collection.users
}

async function getAllComment(id,id2,id3) {
    const groupDocument = await getCollectionById(id) 
    const group = groupDocument.find(({id}) => id === id2)
    const postDocument = group.posts
    const post = postDocument.find(e => e.id === id3)
    const comments = post.comments
    return comments
}

module.exports = getAllComment;

// getAllComment('5ff6c0867d514016b0b7fc6c', "5ff6c0867d514016b0b7fc6d", "5ff6c0867d514016b0b7fc6e")