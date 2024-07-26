import axios from 'axios';
import { CookieInstance } from './utils/CookieContext';
import {Environment} from './utils/config';

// const URL = 'http://localhost:4000/api/v1';
const URL = Environment.REACT_APP_BACKEND_URL;

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
    return Promise.reject(new Error(error));
  }
);


export default axiosInstance;