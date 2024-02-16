require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const Post = require('./models/Post')
const connectDB = require('./config/dbConn')
const { default: mongoose } = require('mongoose')

//connect to mongodb
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});

