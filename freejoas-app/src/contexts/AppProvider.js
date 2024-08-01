/**
 * Provides the application context for the entire app.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @returns {ReactNode} The rendered component tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { UserProvider } from "./UserContext";
import { UserLocationProvider } from "./UserLocationContext";
import { SelectedFreejoaProvider } from "./SelectedFreejoaContext";
import { FreejoasDataProvider } from "./FreejoasDataContext";
import { RecentViewedProvider } from "./RecentViewedContext";
import { MobileDetectProvider } from "./MobileDetectContext";



const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <UserLocationProvider>
        <SelectedFreejoaProvider>
          <FreejoasDataProvider>
            <RecentViewedProvider>
              <MobileDetectProvider>
                {children}
              </MobileDetectProvider>
            </RecentViewedProvider>
          </FreejoasDataProvider>
        </SelectedFreejoaProvider>
      </UserLocationProvider>
    </UserProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProvider;
