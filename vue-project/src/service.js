const axios = require('axios').default;

const baseURL = 'http://localhost:3000';

axios.get('/api/posts').then((response) => {
    return response;
}).catch((error) => {
    console.log(error);
})
