import axios from 'axios';
import config from './config';
import { CookieInstance } from './components/CookieContext';

const URL = config.baseURL + config.apiVersion;

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 5000,
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