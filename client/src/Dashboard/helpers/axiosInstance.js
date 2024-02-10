import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petfarm.onrender.com/api/',
  withCredentials: true,
});

export default api;
