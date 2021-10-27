const UsersCollection = require("../model/usersCollection-model");

    async function getCollection(id) {
        const collection = await UsersCollection.findById(id)
        return collection;
    }
    
    async function searchItem(id, searchItem) {
        const result = await getCollection(id)
        const items = []
        result.users.map(e => {
            e.posts.map(e1 => {
                const str1 = e1.postContent.toLowerCase()
                const str2 = searchItem.toLowerCase()
                if(str1.includes(str2)){
                    var temp = {
                        group_id: e._id,
                        userName: e.name,
                        userLink: e.facebookLink,
                        _id: e1._id,
                        postLink: e1.postId,
                        postContent: e1.postContent,
                        numberOfLikes: e1.numberOfLikes,
                        numberOfShares: e1.numberOfShares,
                        timeOfPost: e1.timeOfPost
                    }
                    items.push(temp)
                }
            })

        })
        return items
    }
    



module.exports = searchItem