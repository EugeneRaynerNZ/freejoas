import React, { createContext, useContext, useEffect, useState } from "react";
import ApiService from "./ApiService";
import SessionStorageManager, {FREEJOAS} from "./SessionStorageManager";
import { CookieInstance } from "./CookieContext";

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

const ServerLOadingContext = createContext();

// create combined context
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [recentVisited, setRecentVisited] = useState([]);
  const [freejoasData, setFreejoasData] = useState([]);
  const [serverLoading, setServerLoading] = useState(false);

  /**
   *  fetch freejoas data from the server
   */
  const fetchFreejoasData = async () => {
    // loading state to true
    setServerLoading(true);
    try {
      const response = await ApiService.fetchFreejoasData();
      if (
        response.data.data === null ||
        response.data.data === undefined ||
        response.data.data.length === 0
      ) {
        console.log("No data has found in the database");
        setFreejoasData([]);
        return;
      }
      setFreejoasData(response.data.data);
      console.log("Data has been fetched from the server:");
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      console.error(error);
    }finally{
      // loading state to false no matter what the result is
      setServerLoading(false);
    }

  }

  /**
   *  load freejoas data from the session storage
   */
  const loadFreejoasData = async () => {
    const cachedData = SessionStorageManager().getItem(FREEJOAS);
    console.log("Cached data: ", cachedData);
    if (cachedData) {
      setFreejoasData(cachedData);
      setServerLoading(false);
    } else {
      const data = await fetchFreejoasData();
      setFreejoasData(data);
      SessionStorageManager().setItem(FREEJOAS, data);
      setServerLoading(false);
    }
  };



  /**
   * Fetch user data from the server
   */
  useEffect(() => {
    console.log("AppProvider loading");
    console.log("User: ", user);  
    if(user){
      loadFreejoasData();
    }
  }, [user]);

  const watchMyPosition = () => {
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
  };

  useEffect(() => {
    // watch user location
    watchMyPosition();
  }, [userLocation]);

  return (
    <ServerLOadingContext.Provider value={{ serverLoading, setServerLoading }}>
      <UserContext.Provider value={{ user, setUser }}>
        <FreejoasDataContext.Provider value={{ freejoasData, setFreejoasData }}>
          <RecentVisitedContext.Provider
            value={{ recentVisited, setRecentVisited }}
          >
            <SelectedItemContext.Provider
              value={{ selectedItem, setSelectedItem }}
            >
              <UserLocationContext.Provider
                value={{ userLocation, setUserLocation }}
              >
                {children}
              </UserLocationContext.Provider>
            </SelectedItemContext.Provider>
          </RecentVisitedContext.Provider>
        </FreejoasDataContext.Provider>
      </UserContext.Provider>
    </ServerLOadingContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export const useSelectedItem = () => useContext(SelectedItemContext);
export const useUserLocation = () => useContext(UserLocationContext);
export const useRecentVisited = () => useContext(RecentVisitedContext);
export const useFreejoasData = () => useContext(FreejoasDataContext);
export const useServerLoading = () => useContext(ServerLOadingContext);
