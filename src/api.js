// src/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Your API base URL
});

// Request interceptor to add tokens
api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const response = await api.post('/token/refresh/', { refresh: refreshToken });
                localStorage.setItem('accessToken', response.data.access);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                return api(originalRequest);
            } catch (err) {
                console.error('Token refresh failed:', err);
                // Optionally, handle logout or redirect to login
            }
        }
        return Promise.reject(error);
    }
);

export default api;
