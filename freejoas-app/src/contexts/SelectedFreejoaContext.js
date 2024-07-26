import React, { useState, createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

/**
 * Context for managing the selected Freejoa.
 * @typedef {Object} SelectedFreejoaContext
 * @property {Object} selectedFreejoa - The currently selected Freejoa.
 * @property {Function} setSelectedFreejoa - Function to set the selected Freejoa.
 */

const SelectedFreejoaContext = createContext();

/**
 * Provider component for the SelectedFreejoaContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */

export const SelectedFreejoaProvider = ({ children }) => {

  const [selectedFreejoa, setSelectedFreejoa] = useState(null);

  const contextValue = useMemo(
    () => ({
      selectedFreejoa,
      setSelectedFreejoa,
    }),
    [selectedFreejoa]
  );

  return (
    <SelectedFreejoaContext.Provider value={contextValue}>
      {children}
    </SelectedFreejoaContext.Provider>
  );
};

SelectedFreejoaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook for accessing the SelectedFreejoaContext.
 * @returns {SelectedFreejoaContext} The SelectedFreejoaContext object.
 */
export const useSelectedFreejoa = () => useContext(SelectedFreejoaContext);
