import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import SessionStorageManager from "../utils/SessionStorageManager";
import { CookieInstance } from "./CookieContext";
import { KEYS } from "../utils/config";
import PropTypes from "prop-types";
/**
 * User context for managing user data and authentication.
 * @typedef {Object} UserContextType
 * @property {Object} user - The user object.
 * @property {Function} updateUser - Function to update the user object.
 * @property {string} token - The authentication token.
 * @property {Function} updateToken - Function to update the authentication token.
 * @property {Function} logout - Function to log out the user.
 */

const UserContext = createContext();

/**
 * Provider component for the UserContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */

export const UserProvider = ({ children }) => {
  const { setCookie, getCookie } = CookieInstance;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // get user from SessionStorage
    const savedUser = SessionStorageManager().getItem(KEYS.KEY_USER);
    if (savedUser) {
      setUser(savedUser);
    }
    // get token from Cookie
    const savedToken = getCookie(KEYS.KEY_USER);
    if (savedToken) {
      setToken(savedToken);
    }
    // eslint-disable-next-line
  }, []);

  /**
   * Update the user object.
   * @param {Object} newUser - The new user object.
   */
  const updateUser = (newUser) => {
    setUser(newUser);
    SessionStorageManager().setItem(KEYS.KEY_USER, newUser);
  };

  /**
   * Update the authentication token.
   * @param {string} newToken - The new authentication token.
   */
  const updateToken = (newToken) => {
    setToken(newToken);
    setCookie(KEYS.KEY_TOKEN, newToken);
  };

  /**
   * Log out the user.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    SessionStorageManager().removeItem(KEYS.KEY_USER);
    setCookie(KEYS.KEY_TOKEN, "");
  };

  const contextValue = useMemo(
    () => ({
      user,
      updateUser,
      updateToken,
      logout,
    }),
    // eslint-disable-next-line
    [user, token]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook for accessing the UserContext.
 * @returns {UserContextType} The UserContext object.
 */
export const useUser = () => useContext(UserContext);
