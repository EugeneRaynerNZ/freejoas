import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:4000/api/v1'; // Replace 'http://example.com/api' with your actual API base URL

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get('token'); // Get token from cookie
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;