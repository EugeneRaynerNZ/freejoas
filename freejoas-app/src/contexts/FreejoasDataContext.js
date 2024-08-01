import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import SessionStorageManager from "../utils/SessionStorageManager";
import { KEYS } from "../utils/config";
import PropTypes from "prop-types";
import logger from "../utils/Logger";

/**
 * Context for providing data and functionality related to Freejoas.
 *
 * @typedef {Object} FreejoasDataContext
 * @property {Array} freejoasData - The array of Freejoas data.
 * @property {Function} updateFreejoasData - The function to update the Freejoas data.
 * @property {boolean} loading - The loading state.
 * @property {Function} setLoading - The function to set the loading state.
 * @property {Error} error - The error object.
 * @property {Function} setError - The function to set the error object.
 */

const FreejoasDataContext = createContext();

/**
 * Provides data and functionality related to Freejoas.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */

export const FreejoasDataProvider = ({ children }) => {

  const [freejoasData, setFreejoasData] = useState([]);

  useEffect(() => {
    // Load data from SessionStorage on initial load
    const savedData = SessionStorageManager().getItem(KEYS.KEY_FREEJOAS);
    if (savedData) {
      setFreejoasData(savedData);
    }
  }, []);

  // Update data and sync with SessionStorage
  const updateFreejoasData = (newData) => {
    logger.debug("Updating Freejoas data:", newData);
    setFreejoasData(newData);
    SessionStorageManager().setItem(KEYS.KEY_FREEJOAS, newData);
  };

  const contextValue = useMemo(
    () => ({
      freejoasData,
      updateFreejoasData,
    }),
    [freejoasData]
  );

  return (
    <FreejoasDataContext.Provider value={contextValue}>
      {children}
    </FreejoasDataContext.Provider>
  );
};
FreejoasDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
/**
 * Custom hook to access the FreejoasDataContext.
 *
 * @returns {FreejoasDataContext} The FreejoasDataContext object.
 */
export const useFreejoasData = () => useContext(FreejoasDataContext);
