import axios from "axios";
import { CookieInstance } from "../contexts/CookieContext";
import { Environment, KEYS } from "../utils/config";
import logger from "../utils/Logger";

const BASE_URL = Environment.REACT_APP_BACKEND_BASE_URL;
const API_VERSION = "v2";
// const API_URL = `${BASE_URL}/api/${API_VERSION}`;
let API_URL = "";

if(Environment.REACT_APP_NODE_ENV === "development") {
  API_URL = `http://localhost:4000/api/${API_VERSION}`;
}else{
  API_URL = `${BASE_URL}/api/${API_VERSION}`;
}

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
      "Content-Type": "application/json",
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
        return;
      }
    );
    /**
     *  Add a response interceptor to handle 401 Unauthorized errors.
     */

    // this.axiosInstance.interceptors.response.use(
    //   (response) => {
    //     return response;
    //   },
    //   (error) => {
    //     const { response } = error;
    //     if (response && response.status === 401) {
    //       // Token is expired or unauthorized, navigate to login
    //         logger.debug("Unauthorized request, redirecting to login");
    //         this.logout();
    //     }
    //     return Promise.reject(error);
    //   }
    // );

  }
  static logout() {
    // remove the token from the cookie
    CookieInstance.removeCookie(KEYS.KEY_TOKEN);
    // navigate to the login page
    this.props.history.push('/login');
  }

  /**
   * Fetches Freejoas data from the API.
   * @returns {Promise<any>} The response data.
   * @throws {Error} If an error occurs during the request.
   */
  static async fetchFreejoasData() {
    try {
      const response = await this.axiosInstance.get("/freejoas");
      logger.debug("API response:", response);
      return response;
    } catch (error) {
      logger.error("Error fetching Freejoas data:", error);
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
      const response = await this.axiosInstance.post("/auth/user/login", {
        email: email,
        password: password,
      });
      return response;
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        // If the status code is 401, 402, or 404, return the response
        if (statusCode === 401 || statusCode === 402 || statusCode === 404) {
          return error.response;
        }
      }
      // Log the error and throw it
      logger.debug("Error during login:", error);
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
      const response = await this.axiosInstance.post("/users", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      return response;
    } catch (error) {
      logger.error("Error during registration:", error);
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
      await this.axiosInstance.post("/users/send-email-verification", {
        email: email,
        username: username,
      });
      logger.info("Verification email sent");
    } catch (error) {
      logger.error("Error sending verification email:", error);
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
      const response = await this.axiosInstance.post("/freejoas", freejoa);
      return response;
    } catch (error) {
      logger.error("Error uploading Freejoa:", error);
      throw error;
    }
  }
}

// Initialize the API service
ApiService.initialize();

export default ApiService;
