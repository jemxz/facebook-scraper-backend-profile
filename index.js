const mongoose = require('mongoose');
const GroupsCollection = require('./model/groupsCollection-model')


mongoose.connect('mongodb://localhost/facebook-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message))


// const group = require('./routers/group')
const express = require('express')
const app = express();
const router = express.Router()


app.get('/api/group/:id',async function (req, res) {
    const id = req.params.id
    const groupsCollection = await GroupsCollection.findOne({"groups.name":id}, {"groups.name.$":true})
    if(!groupsCollection) res.status(404).send('It doesnt exist')
    res.send(groupsCollection);
    
});



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));