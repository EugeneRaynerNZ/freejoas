import React, {createContext, useContext} from "react";
import CookieManager from "../utils/CookieManager";
import PropTypes from "prop-types";

// Create a context for the cookie manager
export const CookieContext = createContext();

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
CookieProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Create a hook to use the cookie manager
export const useCookie = () => useContext(CookieContext);
