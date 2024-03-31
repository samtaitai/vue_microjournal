require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const Post = require('./models/Post')
const connectDB = require('./config/dbConn')
const { default: mongoose } = require('mongoose')
const controller = require('./controllers/controller')
const cors = require('cors');
const bodyParser = require('body-parser');

//enable cors for all routes
//because Vue dev server is localhost:5173 and node(backend) serve is localhost:3000
app.use(cors());
//to parse json data from the req.body
app.use(bodyParser.json());

//connect to mongodb
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/posts', controller.getAllPosts);
app.get('/post/:id', controller.getPostById);
app.post('/posts', controller.insertPost);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
});

