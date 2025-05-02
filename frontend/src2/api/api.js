import axios from 'axios';

const BASE_URL = 'https://testproject-k2cs.onrender.com/api'; // Replace with your backend URL
// const BASE_URL =  'http://127.0.0.1:5000'; // Replace with your backend URL

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // Set an appropriate timeout
});