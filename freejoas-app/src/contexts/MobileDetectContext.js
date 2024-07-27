import React, { useState, createContext, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import logger from "../utils/Logger";

/**
 * Context for detecting if the application is running on a mobile device.
 * @type {React.Context}
 */
const MobileDetectContext = createContext();

/**
 * Provider component for the MobileDetectContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const MobileDetectProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    /**
     * Checks if the window width is less than 768px and updates the isMobile state accordingly.
     */
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    /**
     * Logs the window.innerWidth and isMobile values whenever isMobile changes.
     */
    useEffect(() => {
        logger.debug("window.innerWidth: ", window.innerWidth);
        logger.debug("isMobile: ", isMobile);
    }, [isMobile]);

    /**
     * The context value provided to the consumers of the MobileDetectContext.
     */
    const contextValue = useMemo(
        () => ({
            isMobile,
        }),
        [isMobile]
    );

    return (
        <MobileDetectContext.Provider value={contextValue}>
            {children}
        </MobileDetectContext.Provider>
    );
};

MobileDetectProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * Custom hook for accessing the MobileDetectContext.
 * @returns {Object} The context value.
 */
export const useMobileDetect = () => useContext(MobileDetectContext);