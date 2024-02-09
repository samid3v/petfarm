import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petfarm-api.onrender.com/api/',
  withCredentials: true,
});

export default api;
