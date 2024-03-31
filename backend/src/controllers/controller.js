const Post = require('../models/Post.js');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.getPostById = async (req, res) => {
    try {
        var id = req.params['id'];
        const post = await Post.findById(id);
        res.json(post);
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.insertPost = async (req, res) => {
    try {
        /* either way should work 
        await newPost.save(); 
        */
        const { userId, userName, recordTime, userText, maskedUserText } = req.body;
        const newPost = new Post({
            userId, 
            userName,
            recordTime,
            userText,
            maskedUserText
        });
       await Post.create(newPost); //no need const something = await ... res.json matters
       res.json({message: 'Post created successfully.'}); //without res.json, then block at Vue won't work 
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};