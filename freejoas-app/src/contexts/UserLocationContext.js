import React, {
    useEffect,
    useState,
    createContext,
    useContext,
    useMemo,
} from "react";
import PropTypes from "prop-types";

/**
 * Context for managing user location.
 * @typedef {Object} UserLocationContextType
 * @property {Object} userLocation - The user's current location.
 * @property {Function} setUserLocation - Function to set the user's location.
 */

const UserLocationContext = createContext();
/**
 * Prop types for UserLocationProvider.
 * @type {Object}
 */


/**
 * Provider component for UserLocationContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const UserLocationProvider = ({ children }) => {

    const [userLocation, setUserLocation] = useState(null);

    /**
     * Watches the user's position and updates the userLocation state.
     * @returns {Function} The cleanup function to clear the watch.
     */
    const watchMyPosition = () => {
        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            });
        }

        // Clean up the watch when the component unmounts
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    };

    useEffect(() => {
        // Watch user location
        watchMyPosition();
    }, [userLocation]);

    /**
     * The context value for UserLocationContext.
     * @type {UserLocationContextType}
     */
    const contextValue = useMemo(
        () => ({ userLocation, setUserLocation }),
        [userLocation]
    );

    return (
        <UserLocationContext.Provider value={contextValue}>
            {children}
        </UserLocationContext.Provider>
    );
};
UserLocationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
/**
 * Custom hook to access the user location from UserLocationContext.
 * @returns {UserLocationContextType} The user location context.
 */
export const useUserLocation = () => useContext(UserLocationContext);
