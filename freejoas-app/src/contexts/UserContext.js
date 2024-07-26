import React, { useEffect, useState, createContext, useContext, useMemo } from "react";
import SessionStorageManager from "../utils/SessionStorageManager";
import { CookieInstance } from "../utils/CookieContext";
import { KEYS } from "../utils/config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Add prop validation for 'children'
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
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
  }, []);

  // update user
  const updateUser = (newUser) => {
    setUser(newUser);
    SessionStorageManager().setItem(KEYS.KEY_USER, newUser);
  };
  // update token
  const updateToken = (newToken) => {
    setToken(newToken);
    setCookie(KEYS.KEY_TOKEN, newToken);
  };

  // logout ==> remove user and token
  const logout = () => {
    setUser(null);
    setToken(null);
    SessionStorageManager().removeItem(KEYS.KEY_USER);
    setCookie(KEYS.KEY_TOKEN, "");
  };

  const contextValue = useMemo(() => ({
    user,
    updateUser,
    token,
    updateToken,
    logout
  }), [user, token]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
  };

export const useUser = () => useContext(UserContext);

