import React, { createContext, useContext, useState } from "react";

// user context
const UserContext = createContext();

// selected item context
const SelectedItemContext = createContext();

// user location context
const UserLocationContext = createContext();

// recent visited context
const RecentVisitedContext = createContext();

// create combined context
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [recentVisited, setRecentVisited] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RecentVisitedContext.Provider
        value={{ recentVisited, setRecentVisited }}
      >
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
          <UserLocationContext.Provider
            value={{ userLocation, setUserLocation }}
          >
            {children}
          </UserLocationContext.Provider>
        </SelectedItemContext.Provider>
      </RecentVisitedContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export const useSelectedItem = () => useContext(SelectedItemContext);
export const useUserLocation = () => useContext(UserLocationContext);
export const useRecentVisited = () => useContext(RecentVisitedContext);
