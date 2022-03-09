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
                        reporting:
                            {
                                is_reported: Boolean,
                                reporting_date: Date,
                                reported_by: String
                            },
                        comments: [
                            {
                                commentContent: String,
                                commenterName: String,
                                commentorId: String,
                                reporting:
                                    {
                                        is_reported: Boolean,
                                        reporting_date: Date,
                                        reported_by: String
                                    }
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