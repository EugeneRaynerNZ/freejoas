import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || '');

  const login = (userToken) => {
    setToken(userToken);
    // You can also store the token in cookies/localStorage for persistence
    Cookies.set('token', userToken, { expires: 7 });
  };

  const logout = () => {
    setToken('');
    // Clear the token from cookies/localStorage
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
