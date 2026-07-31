import axios from 'axios';

const api = axios.create({
    //for local
    // baseURL: 'http://localhost:8000/api',
    //for server
    baseURL: 'https://cvmanagementapi.ahasanhabibroxy.online/api',

    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;