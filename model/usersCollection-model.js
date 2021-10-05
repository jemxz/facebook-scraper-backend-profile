const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersCollection = new Schema({
        users: [
            {
                name: String,
                numberOfFriends: String,
                about: String,
                facebookLink: String,
                info: Array,
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

const UsersCollection = mongoose.model('UsersCollection', usersCollection)
module.exports = UsersCollection