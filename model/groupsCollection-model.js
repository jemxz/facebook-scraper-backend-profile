const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupsCollection = new Schema({
        groups: [
            {
                name: String,
                numberOfFollowers: String,
                about: String,
                facebookLink: String,
                posts: [
                    {
                        postId: String,
                        postContent: String,
                        numberOfLikes: String,
                        numberOfShares: String,
                        timeOfPost: String,
                        comments: [
                            {
                                commentContent: String,
                                commenterName: String,
                                commentorId: String
                            }
                        ]
                    }
                ]     
            }
        ],
        date: String
})

const GroupsCollection = mongoose.model('GroupsCollection', groupsCollection)
module.exports = GroupsCollection