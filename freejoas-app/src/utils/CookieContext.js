import React, {createContext, useContext} from "react";
import CookieManager from "./CookieManager";

export const KEY_TOKEN = 'token';
export const KEY_USER = 'user';

// Create a context for the cookie manager
export const CookieContext = createContext();

// Create a hook to use the cookie manager
export const useCookie = () => useContext(CookieContext);

// Create an instance of the cookie manager
export const CookieInstance = new CookieManager();

// Create a provider for the cookie manager
export const CookieProvider = ({children}) => {
    return (
        <CookieContext.Provider value={CookieInstance}>
            {children}
        </CookieContext.Provider>
    );
};

