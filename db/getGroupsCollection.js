const GroupsCollection = require('../model/groupsCollection-model')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/facebook-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message))


async function getGroupsCollection() {
    const id = "5fd0f98751e33831d8ef489a"
    const groupsCollection = await GroupsCollection.findOne({"groups._id":id}, {"groups._id.$":true})
    const posts = groupsCollection.groups[0].posts

                
       

    console.log(groupsCollection);
}

getGroupsCollection()