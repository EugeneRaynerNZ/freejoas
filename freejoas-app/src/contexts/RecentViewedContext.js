import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import LocalStorageManager from "../utils/LocalStorageManager";
import { KEYS } from "../utils/config";
import { useUser } from "./UserContext";
/**
 * Context for managing recently viewed items.
 */
const RecentViewedContext = createContext();

/**
 * Provider component for the RecentViewedContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 */

export const RecentViewedProvider = ({ children }) => {
  const { user } = useUser();
  const [recentViewed, setRecentViewed] = useState([]);

  /**
   * Updates the list of recent viewed items.
   * @param {Object} newData - The new item to be added or moved to the front.
   */
  const updateRecentViewed = (newData) => {
    setRecentViewed((prevRecentViewed) => {
      // check if the item is already in the list
      const index = prevRecentViewed.findIndex(
        (item) => item._id === newData._id
      );

      let newRecentViewed;
      if (index !== -1) {
        // move the item to the front if it exists
        newRecentViewed = [
          newData,
          ...prevRecentViewed.slice(0, index),
          ...prevRecentViewed.slice(index + 1),
        ];
      } else {
        // add the item to the front if it doesn't exist
        newRecentViewed = [newData, ...prevRecentViewed];
      }

      // limit the list to 5 items
      newRecentViewed = newRecentViewed.slice(0, 5);

      // save the list to local storage
      LocalStorageManager.saveUserData(
        user._id,
        KEYS.KEY_RECENT_VIEWED,
        newRecentViewed
      );
      return newRecentViewed;
    });
  };

  // Load data from LocalStorage on initial load
  useEffect(() => {
    if (user?.id) {
      const savedData = LocalStorageManager.getUserData(
        user._id,
        KEYS.KEY_RECENT_VIEWED
      );
      setRecentViewed(savedData);
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      recentViewed,
      updateRecentViewed,
    }),
    // eslint-disable-next-line
    [recentViewed]);

  return (
    <RecentViewedContext.Provider value={contextValue}>
      {children}
    </RecentViewedContext.Provider>
  );
};

RecentViewedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook for accessing the RecentViewedContext.
 * @returns {Object} - The recent viewed context value.
 */
export const useRecentViewed = () => useContext(RecentViewedContext);
