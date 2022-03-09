const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const userscollection = require('./routes/groupsCollection')
const groupsonly = require('./routes/onlyGroups')
const datesandgroups = require('./routes/onlyDatesAndGroups')
const full = require('./routes/full')
const date = require('./routes/date')
const singleGroup = require('./routes/singleGroup')
const singlePost = require('./routes/singlePost')
const singleComment = require('./routes/singleComment')
const allPosts = require('./routes/allPosts')
const allComments = require('./routes/allComments')
const searchItem = require('./routes/searchContent');
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


mongoose.connect('mongodb://localhost/facebook-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB ...'))
    .catch(err => console.log(err.message))




app.use('/api/user/search', userscollection)
app.use('/api/users/onlygroups', groupsonly)
app.use('/api/users/datesandgroups', datesandgroups)
app.use('/api/users/search', searchItem)
app.use('/api/users', full)
app.use('/api/users/dates', date)
app.use('/api/users/user', singleGroup)
app.use('/api/users/post', singlePost)
app.use('/api/users/comment', singleComment)
app.use('/api/users/posts', allPosts)
app.use('/api/users/comments', allComments)


const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on port ${port} ...`));