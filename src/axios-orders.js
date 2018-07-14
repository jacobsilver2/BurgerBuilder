import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-a8bce.firebaseio.com/'
})

export default instance;