import React, { createContext, useContext, useEffect, useState } from "react";

// user context
const UserContext = createContext();

// selected item context
const SelectedItemContext = createContext();

// user location context
const UserLocationContext = createContext();

// recent visited context
const RecentVisitedContext = createContext();

// freejoas data context
const FreejoasDataContext = createContext();

// loading context
const LoadingContext = createContext();


// create combined context
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [recentVisited, setRecentVisited] = useState([]);
  const [freejoasData, setFreejoasData] = useState([]);
  const [loading, setLoading] = useState(false);

  const watchMyPosition = () =>{
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }

    // clean up the watch when the component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }

  useEffect(() => {
     // watch user location
     watchMyPosition();
  }, [userLocation]);

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
