import axios from 'axios';

// Axios instance configuration for making API requests
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    Headers: {
        'Content-Type': 'application/json'
    }
});
 
// Request interceptor to add authorization token to headers if available
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
 
    return config;
}, (error) => Promise.reject(error));
 
// Response interceptor to handle token expiration and redirect to login
axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export default axiosInstance;