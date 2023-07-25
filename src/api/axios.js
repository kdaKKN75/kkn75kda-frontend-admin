import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 60,
});

export default client;
