import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('watercare_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized if on admin route
      if (window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('watercare_token');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
