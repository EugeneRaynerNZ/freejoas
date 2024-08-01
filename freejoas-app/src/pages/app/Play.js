import React, { useEffect, useState } from "react";
import { useFreejoasData } from "../../contexts/FreejoasDataContext";
import { useUserLocation } from "../../contexts/UserLocationContext";
import { useSelectedFreejoa } from "../../contexts/SelectedFreejoaContext";
import { useMobileDetect } from "../../contexts/MobileDetectContext";
import logger from "../../utils/Logger";
import "../../App.scss";
import { LuRefreshCw } from "react-icons/lu";
import Navigation from "../../components/Navigation";
import NavigationCard from "../../components/NavigationCard";
import useDistance from "../../utils/DistanceFilter";
import ApiService from "../../services/ApiService";
import MapContainer from "../../components/MapComponents/GoogleMap";
import ListView from "../../components/ListView";
// import Probability from '../../components/Probability';

function PlayWithMap() {
  // global state
  const { userLocation } = useUserLocation(); // get the user location from the context
  const { freejoasData, updateFreejoasData } = useFreejoasData(); // get the freejoas data from the context
  const { selectedFreejoa, setSelectedFreejoa } = useSelectedFreejoa(); // get the selected item from the context
  const { filterPointsByDistance } = useDistance(); // get the calculate distance function from the context
  const { isMobile } = useMobileDetect(); // get the isMobile state from the context
  // local state
  const [loading, setLoading] = useState(false); // loading state
  const [filteredData, setFilteredData] = useState(null); // filtered data based on the distance
  const [currentFilter, setCurrentFilter] = useState(null); // filter state: 1000m, 3000m, 5000m
  const [isListView, setIsListView] = useState(true); // list view or map view

  // fetch the data from the API
  const fetchDataFromAPI = async () => {
    setLoading(true);
    setSelectedFreejoa(null);
    try {
      const response = await ApiService.fetchFreejoasData();
      logger.debug("fetchFreejoasData response: ", response);
      if (response.status === 200) {
        logger.debug("Freejoas data fetched successfully");
        updateFreejoasData(response.data.data);
      }
      logger.debug("Freejoas data: ", freejoasData);
    } catch (error) {
      logger.error("Error fetching Freejoas data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    logger.info("Loading cached data...");
    if (!freejoasData || freejoasData.length === 0) {
      logger.info("Fetching data from API...");
      fetchDataFromAPI();
    }
    // only run this effect once
    // eslint-disable-next-line
  }, []);

  const handleSync = () => {
    logger.info("Syncing data from API...");
    fetchDataFromAPI();
  };

  const handleDistanceFilter = (maxDistance) => {
    // filter the data based on the distance
    setCurrentFilter(maxDistance);
    logger.debug("Filtering data by distance: ", maxDistance);
  };

  useEffect(()=>{
    if(!currentFilter){
      setCurrentFilter(1000);
    }
    if(userLocation){
      const filteredData = filterPointsByDistance(
        userLocation,
        freejoasData,
        currentFilter
      );
      // update the filtered data
      setFilteredData(filteredData);
      logger.debug("Filtered data: ", filteredData);
    }
    // eslint-disable-next-line
  },[currentFilter, userLocation])

  return (
    <section className="explore w-full main-container flex flex-col">
      <div className="main-container--top container-size flex flex-col">
        <div className="flex flex-col gap-8 w-full">
          <p className="page-title">Explore</p>
        </div>

        <div className="container-size flex-1 flex flex-col">
          <div className="flex">
            {
              // check all the props are available before rendering the NavigationCard component
              // might need a notification to tell user that location access is required
              isMobile && selectedFreejoa && userLocation && (
                /**
                 *  When a freejoa has been selected, show the navigation arrow.
                 *  this feature is only available on mobile devices
                 */
                <NavigationCard />
              )
            }
          </div>
          <div className="container-size flex flex-col">
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

                  <div className="flex flex-col" style={{gap: "8px"}}>
                    <h2>Filters</h2>
                    <div className="filters">
                      <button
                        className="filter"
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            currentFilter === 1000 ? "#0A2E36" : "",
                          color:
                            currentFilter === 1000 ? "#fff" : "",
                        }}
                        onClick={() => {
                          handleDistanceFilter(1000);
                        }}
                      >
                        Under 1 km
                      </button>
                      <button
                        className="filter"
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            currentFilter === 3000 ? "#0A2E36" : "",
                          color:
                            currentFilter === 3000 ? "#fff" : "",
                        }}
                        onClick={() => {
                          handleDistanceFilter(3000);
                        }}
                      >
                        Under 3 km
                      </button>
                      <button
                        className="filter"
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            currentFilter === 5000 ? "#0A2E36" : "",
                          color:
                            currentFilter === 5000 ? "#fff" : "",
                            
                        }}
                        onClick={() => {
                          handleDistanceFilter(5000);
                        }}
                      >
                        Under 5 km
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    {/* only show view buttons on mobile device */}
                    {isMobile && (
                      <>
                      <button
                      style={{
                        cursor: "pointer",
                        color: isListView ? "#0A2E36" : "",
                        borderBottom: isListView ? "2px solid #0A2E36" : "",
                      }}
                      onClick={() => setIsListView(true)}>
                        View as list
                      </button>

                      <button
                       style={{
                        cursor: "pointer",
                        color: !isListView ? "#0A2E36" : "",
                        borderBottom: !isListView ? "2px solid #0A2E36" : "",
                      }}
                      onClick={() => setIsListView(false)}>
                        View as map
                      </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="explore-container container-size">
                  {isMobile ? (
                    <>
                      {isListView ? (
                        <ListView data={filteredData} />
                      ) : (
                        <MapContainer
                          markerData={filteredData}
                          filterLevel={currentFilter}
                        />
                      )}
                    </>
                  ):
                  (
                    <>
                    <ListView data={filteredData} />
                    <MapContainer
                          markerData={filteredData}
                          filterLevel={currentFilter}
                        />
                    </>
                  )
                  }
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
