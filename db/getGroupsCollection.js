const UsersCollection = require('../model/usersCollection-model');




async function getGroupsCollection(ids) {
    const id = ids
   
    const groupsCollection = await UsersCollection.findOne({"groups.name":id.toLocaleUpperCase()}, {"groups.name.$":true})
    console.log(groupsCollection);
    return groupsCollection
}
module.exports = getGroupsCollection
// getGroupsCollection("cnn")