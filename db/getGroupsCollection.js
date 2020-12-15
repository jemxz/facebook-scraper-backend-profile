const GroupsCollection = require('../model/groupsCollection-model')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/facebook-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message))


async function getGroupsCollection() {
    const id = "Bisrate Gebriel International School - BGIS"
    const groupsCollection = await GroupsCollection.findOne({"groups.name":id}, {"groups.name.$":true})
    return groupsCollection
}

getGroupsCollection()