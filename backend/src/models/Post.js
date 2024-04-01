const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    userId: String,
    userName: String,
    recordTime: Date,
    userText: String,
    maskedUserText: String,
    password: String
});

const Post = model('Post', postSchema);
module.exports = Post;
