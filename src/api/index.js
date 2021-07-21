import axios from 'axios';

// const server = axios.create({
//     baseURL: 'http://localhost:4000'
// })

const server = axios.create({
    baseURL: 'https://quiet-everglades-51100.herokuapp.com/'
})

export default server;
