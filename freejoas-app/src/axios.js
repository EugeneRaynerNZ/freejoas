import axios from 'axios';
import { CookieInstance } from './components/CookieContext';

const URL = 'https://freejoas.azurewebsites.net/api/v1';

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  // Add a request interceptor
  async (axiosConfig) => {
    // Get the token from the cookie
    const token = CookieInstance.getCookie('token');  
    if (token) {
      // Set the Authorization header
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;