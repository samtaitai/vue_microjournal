const { ObjectId } = require('mongodb');
const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    _id: ObjectId,
    userId: String,
    userName: String,
    recordTime: Date,
    userText: String
});

const Post = model('Post', postSchema);
module.exports = Post;
