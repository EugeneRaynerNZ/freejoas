import axios from "axios";
import { CookieInstance } from "./CookieContext";
import { Environment, KEYS } from "./config";


const BASE_URL = Environment.REACT_APP_BACKEND_BASE_URL;
const API_VERSION = 'v2';
const API_URL = `${BASE_URL}/api/${API_VERSION}`;
class ApiService {
    static axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    static initialize() {
      // Add a request interceptor
      this.axiosInstance.interceptors.request.use(
        async (axiosConfig) => {
          // Get the token from the cookie
          const token = CookieInstance.getCookie(KEYS.KEY_TOKEN);  
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
    }
  
    static async fetchFreejoasData() {
      try {
        const response = await this.axiosInstance.get('/freejoas');
        return response.data;
      } catch (error) {
        console.error('Error fetching Freejoas data:', error);
        throw error;
      }
    }
  
    static async login(email, password) {
      try {
        const response = await this.axiosInstance.post('/auth/user/login', {
          email: email,
          password: password,
        });
        return response.data;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    }

    static async register(firstname, lastname, email, password) {
        try {
            const response = await this.axiosInstance.post('/users', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            });
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
        
    }

    static async sendVerificationEmail(email, username) {
        try {
            await this.axiosInstance.post('/users/send-email-verification', {
                email: email,
                username: username,
            });
            console.log('Verification email sent');
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw error;
        }
    }

    static async uploadFreejoa(freejoa) {
        try {
            const response = await this.axiosInstance.post('/freejoas', freejoa);
            return response.data;
        } catch (error) {
            console.error('Error uploading Freejoa:', error);
            throw error;
        }
    }


  }
  
  // Initialize the API service
  ApiService.initialize();
  
export default ApiService;