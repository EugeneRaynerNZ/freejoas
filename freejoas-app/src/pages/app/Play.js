import React, { useState, useEffect } from "react";
import {
  useRecentVisited,
  useUser,
  useSelectedItem,
  useUserLocation,
} from "../../utils/AppContext";
import "../../App.scss";
import axios from "../../axios";
import { LuRefreshCw } from "react-icons/lu";
import { FaTree } from "react-icons/fa";
import Navigation from "../../Navigation";
import LogoPlaceholder from "../../images/example-2.svg";
import SessionStorageManager, {
  FREEJOAS,
} from "../../utils/SessionStorageManager";
import LocalStorageManager, {
  KEY_RECENT_VISITED,
} from "../../utils/LocalStorageManager";
import MapContainer from "../../components/GoogleMap";
import NavigationCard from "../../components/NavigationCard";
import useDistance from "../../utils/DistanceFilter";
import { useMap } from "@vis.gl/react-google-maps";
// import Probability from '../../components/Probability';

function PlayWithMap() {
  const { user } = useUser(); // get the user from the context
  const { recentVisited, setRecentVisited } = useRecentVisited(); // get the recent visited from the context
  const { selectedItem, setSelectedItem } = useSelectedItem(); // get the selected item from the context
  const { userLocation } = useUserLocation(); // get the user location from the context
  const { filterPointsByDistance } = useDistance(); // get the calculate distance function from the context
  const [data, setData] = useState([]); // freejoas data from the server
  const [filteredData, setFilteredData] = useState(data); // filtered data based on the distance
  const [currentFilter, setCurrentFilter] = useState(null); // filter state
  const [loading, setLoading] = useState(true); // loading state
  const map = useMap("freejoaMap"); // get the map object instance

  function handleRecentVisited(item) {
    setRecentVisited((prevVisited) => {
      // check if the item is already in the recent visited
      const index = prevVisited.findIndex(
        (visited) => visited._id === item._id
      );

      if (index !== -1) {
        // move the current item to the top of the list
        const updatedVisited = [
          prevVisited[index],
          ...prevVisited.slice(0, index),
          ...prevVisited.slice(index + 1),
        ];
        return updatedVisited.slice(0, 5); // only return the first 5 items
      } else {
        // add the current item to the top of the list
        return [item, ...prevVisited].slice(0, 5);
      }
    });
  }

  useEffect(() => {
    if (user) {
      LocalStorageManager.saveUserData(
        user._id,
        KEY_RECENT_VISITED,
        recentVisited
      );
    }
  }, [recentVisited, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await axios.get("/freejoa/all").then((response) => {
        if (
          response.data.data === null ||
          response.data.data === undefined ||
          response.data.data.length === 0
        ) {
          console.log("No data");
          return;
        }
        setData(() => response.data.data);
        setFilteredData(() => response.data.data);
        SessionStorageManager().setItem(FREEJOAS, response.data.data);
      });
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = SessionStorageManager().getItem(FREEJOAS);
    if (cachedData) {
      setData(() => cachedData);
      setFilteredData(() => cachedData);
      setLoading(false);
      console.log("Cached data: ");
      return;
    }
    fetchData();
    console.log("Fetching data: ");
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function handleSelectItem(item) {
    setSelectedItem(item);
    handleRecentVisited(item);
    console.log("Recent visited: ", recentVisited);

    scrollToTop();
  }

  const handleSync = () => {
    console.log("Syncing data");
    fetchData();
  };

  useEffect(() => {
    if (!map) {
      return;
    }
    if (!userLocation) {
      return;
    }

    if (currentFilter) {
      console.log("Current filter: ", currentFilter);
      map.setCenter(userLocation);

      switch (currentFilter) {
        case 1000:
          map.setZoom(16);
          break;
        case 1200:
          map.setZoom(15);
          break;
        case 5000:
          map.setZoom(13);
          break;
      }
    }
  }, [map, currentFilter]);

  const handleDistanceFilter = (maxDistance) => {
    // filter the data based on the distance
    console.log("Filtering data");

    // if the current filter is the same as the one user clicked, remove the filter
    if (currentFilter === maxDistance) {
      // remove the filter
      setFilteredData(data);
      setCurrentFilter(null);
      console.log("filter state removed");
      return;
    }

    if (userLocation) {
      const filteredData = filterPointsByDistance(
        userLocation,
        data,
        maxDistance
      );

      setFilteredData(filteredData);
      setCurrentFilter(maxDistance);
      console.log("Filtered data: ", filteredData);
      console.log("Current filter: ", maxDistance);
    }
    // return the filtered data
  };

  return (
    <section className="explore w-full main-container flex flex-col">
      {/* <div className="logout-button">Logout</div> */}
      <div className="main-container--top flex flex-col">
        <div className="flex flex-col gap-8 w-full">
          <p className="page-title">Explore</p>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex">
            {
              // check all the props are available before rendering the NavigationCard component
              // might need a notification to tell user that location access is required
              selectedItem && userLocation && (
                /**
                 *  When a freejoa has been selected, show the navigation arrow.
                 *  this feature is only available on mobile devices
                 */
                <NavigationCard />
              )
            }
          </div>
          <div style={{ height: "100%" }}>
            {loading ? (
              // Need to make this spinner working while we are fetching the data from the server
              <div className="flex flex-col items-center gap-4 justify-center w-full">
                <svg
                  className="rotating"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34ZM17 30.94C9.30115 30.94 3.06 24.6988 3.06 17C3.06 9.30115 9.30115 3.06 17 3.06C24.6988 3.06 30.94 9.30115 30.94 17C30.94 24.6988 24.6988 30.94 17 30.94ZM7.77987 10.8632C6.43868 12.8864 8.07262 15.2716 10.4584 15.7191L13.4211 16.2747C14.1706 16.4153 14.8745 15.8608 15.4288 15.3371C15.9831 14.8133 16.5765 14.1419 16.4786 13.3857L16.0916 10.3963C15.7799 7.98899 13.491 6.22265 11.3951 7.44715C10.6764 7.86707 10.0036 8.36965 9.39165 8.94792C8.77966 9.52619 8.2398 10.1694 7.77987 10.8632ZM15.7228 23.4141C15.2753 25.7998 12.8901 27.4338 10.8669 26.0926C10.1731 25.6326 9.52991 25.0928 8.95163 24.4808C8.37336 23.8688 7.87078 23.1961 7.45086 22.4774C6.22636 20.3815 7.9927 18.0926 10.4 17.7809L13.3894 17.3938C14.1456 17.2959 14.8171 17.8894 15.3408 18.4437C15.8645 18.9979 16.419 19.7019 16.2785 20.4513L15.7228 23.4141ZM23.4178 18.1497C25.8035 18.5971 27.4375 20.9823 26.0963 23.0055C25.6364 23.6993 25.0965 24.3425 24.4845 24.9208C23.8725 25.4991 23.1998 26.0017 22.4811 26.4216C20.3852 27.6461 18.0963 25.8797 17.7846 23.4725L17.3975 20.4831C17.2996 19.7268 17.8931 19.0554 18.4474 18.5317C19.0016 18.0079 19.7056 17.4534 20.4551 17.594L23.4178 18.1497ZM18.1534 10.4547C18.6008 8.0689 20.9861 6.43497 23.0093 7.77615C23.7031 8.23609 24.3462 8.77595 24.9245 9.38794C25.5028 9.99992 26.0054 10.6726 26.4253 11.3914C27.6498 13.4872 25.8835 15.7762 23.4762 16.0878L20.4868 16.4749C19.7305 16.5728 19.0591 15.9793 18.5354 15.4251C18.0116 14.8708 17.4571 14.1669 17.5977 13.4174L18.1534 10.4547Z"
                    fill="#0A2E36"
                  />
                </svg>
                <p>Finding Freejoas near you...</p>
              </div>
            ) : (
              <>
                <div className="explore-heading pb-4 pt-8">
                  <div className="flex flex-row gap-2 items-center">
                    <h1>Select a location</h1>
                    <LuRefreshCw onClick={handleSync} />
                  </div>

                  <h2>Filters</h2>
                  <div className="filters">
                    <div
                      className="filter"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          currentFilter === 1000 ? "#69E0AE" : "",
                      }}
                      onClick={() => {
                        handleDistanceFilter(1000);
                      }}
                    >
                      Under 1 km
                    </div>
                    <div
                      className="filter"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          currentFilter === 1200 ? "#69E0AE" : "",
                      }}
                      onClick={() => {
                        handleDistanceFilter(1200);
                      }}
                    >
                      Under 1.2 km
                    </div>
                    <div
                      className="filter"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          currentFilter === 5000 ? "#69E0AE" : "",
                      }}
                      onClick={() => {
                        handleDistanceFilter(5000);
                      }}
                    >
                      Under 5 km
                    </div>
                  </div>
                </div>

                <div className="explore-container">
                  {/* When a user clicks a location from the list on the left, the map should focus on the map marker that is the same */}

                  <ul className="location-list">
                    {filteredData.map((item) => (
                      <li
                        key={item._id}
                        className={`location-list--item${
                          selectedItem && item._id === selectedItem._id
                            ? " active-list—item"
                            : ""
                        }`}
                        onClick={() => handleSelectItem(item)}
                      >
                        {item.image ? (
                          <div
                            className="location-list--item-image"
                            style={{
                              backgroundImage: `url(${item.image[0].data})`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        ) : (
                          <div
                            className="location-list--item-image"
                            style={{
                              backgroundImage: `url(${LogoPlaceholder})`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        )}
                        <div className="location-list--item-container">
                          <div className="location-list--item-filter">
                            {/* <span>Under 1 km</span> */}
                            <div className="location-list--item-tree">
                              <span>{item.amount}</span>
                              <FaTree />
                            </div>
                          </div>
                          <span className="location-list--item-title">
                            {item.title}
                          </span>
                          {/* <Probability text="High Probability" type="high" />
                        <div className="location-list--item-visited">
                          <em>Visited on 28/02/2024</em>
                        </div> */}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* When a user clicks a map marker, the location that is selected should highlight on the left */}
                  <MapContainer markerData={filteredData}></MapContainer>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="main-container--bottom">
        <Navigation />
      </div>
    </section>
  );
}

export default PlayWithMap;
