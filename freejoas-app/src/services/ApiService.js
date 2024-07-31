import axios from "axios";
import { CookieInstance } from "../contexts/CookieContext";
import { Environment, KEYS } from "../utils/config";
import logger from "../utils/Logger";

const BASE_URL = Environment.REACT_APP_BACKEND_BASE_URL;
const API_VERSION = 'v2';
const API_URL = `${BASE_URL}/api/${API_VERSION}`;

/**
 * Class representing an API service.
 */
class ApiService {
    /**
     * Axios instance for making HTTP requests.
     * @type {import("axios").AxiosInstance}
     */
    static axiosInstance = axios.create({
        baseURL: API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    /**
     * Initializes the API service by adding a request interceptor.
     */
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

    /**
     * Fetches Freejoas data from the API.
     * @returns {Promise<any>} The response data.
     * @throws {Error} If an error occurs during the request.
     */
    static async fetchFreejoasData() {
        try {
            const response = await this.axiosInstance.get('/freejoas');
            logger.debug('API response:', response);
            return response;
        } catch (error) {
            logger.error('Error fetching Freejoas data:', error);
            throw error;
        }
    }

    /**
     * Logs in a user with the provided email and password.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @returns {Promise<any>} The response data.
     * @throws {Error} If an error occurs during the request.
     */
    static async login(email, password) {
        try {
            const response = await this.axiosInstance.post('/auth/user/login', {
                email: email,
                password: password,
            });
            return response;
        } catch (error) {
            logger.error('Error during login:', error);
            throw error;
        }
    }

    /**
     * Registers a new user with the provided details.
     * @param {string} firstname - The user's first name.
     * @param {string} lastname - The user's last name.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @returns {Promise<any>} The response data.
     * @throws {Error} If an error occurs during the request.
     */
    static async register(firstname, lastname, email, password) {
        try {
            const response = await this.axiosInstance.post('/users', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            });
            return response;
        } catch (error) {
            logger.error('Error during registration:', error);
            throw error;
        }
    }

    /**
     * Sends a verification email to the user with the provided email and username.
     * @param {string} email - The user's email.
     * @param {string} username - The user's username.
     * @throws {Error} If an error occurs during the request.
     */
    static async sendVerificationEmail(email, username) {
        try {
            await this.axiosInstance.post('/users/send-email-verification', {
                email: email,
                username: username,
            });
            logger.info('Verification email sent');
        } catch (error) {
            logger.error('Error sending verification email:', error);
            throw error;
        }
    }

    /**
     * Uploads a Freejoa to the API.
     * @param {object} freejoa - The Freejoa object to upload.
     * @returns {Promise<any>} The response data.
     * @throws {Error} If an error occurs during the request.
     */
    static async uploadFreejoa(freejoa) {
        try {
            const response = await this.axiosInstance.post('/freejoas', freejoa);
            return response;
        } catch (error) {
            logger.error('Error uploading Freejoa:', error);
            throw error;
        }
    }
}

// Initialize the API service
ApiService.initialize();

export default ApiService;