const UsersCollection = require("../model/usersCollection-model");

    async function getCollection() {
        const collection = await UsersCollection.find()
        return collection;
    }
    
    async function searchItem(searchItem) {
        const result = await getCollection()
        const items = []
        result[0].users.map(e => {
            e.posts.map(e1 => {
                const str1 = e1.postContent.toLowerCase()
                const str2 = searchItem.toLowerCase()
                if(str1.includes(str2)){
                    var temp = {
                        _id: e1._id,
                        postContent: e1.postContent    
                    }
                    items.push(temp)
                }
            })

        })
        return items
    }
    



module.exports = searchItem