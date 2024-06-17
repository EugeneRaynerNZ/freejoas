import React from 'react';
import { useState, useEffect } from 'react';
import { useRecentVisited } from '../../utils/RecentVisitedContext';
import { useUser } from '../../utils/UserContext';
import '../../App.css';
import axios from '../../axios';
import { FaTree } from "react-icons/fa";
import Navigation from "../../Navigation";
import NumberToColorGradient from "../../components/ColourGenerator";
import Arrow from "../../components/Arrow";
import ArrowUpwardIcon from '../../images/arrow.svg';
import LogoPlaceholder from '../../images/example-2.svg'
import SessionStorageManager, { FREEJOAS } from '../../utils/SessionStorageManager';
import LocalStorageManager, {KEY_RECENT_VISITED} from '../../utils/LocalStorageManager';

// import Probability from '../../components/Probability';

function Play() {

  const [freejoaLocation, setFreejoaLocation] = useState(null);
  const [myCurrentCoordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [distance, setDistance] = useState(0);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { recentVisited, setRecentVisited } = useRecentVisited();
  const { user } = useUser();

  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  function handleRecentVisited(item) {
    setRecentVisited(prevVisited => {
      // check if the item is already in the recent visited
      const index = prevVisited.findIndex(visited => visited._id === item._id);

      if (index !== -1) {
        // move the current item to the top of the list
        const updatedVisited = [
          prevVisited[index],
          ...prevVisited.slice(0, index),
          ...prevVisited.slice(index + 1)
        ];
        return updatedVisited.slice(0, 5); // only return the first 5 items
      } else {
        // add the current item to the top of the list
        return [item, ...prevVisited].slice(0, 5);
      }
    });

    LocalStorageManager.saveUserData(user._id, KEY_RECENT_VISITED, recentVisited);
  }


  const fetchData = async () => {
    try {
      const response = await axios.get('/freejoa/all');
      if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
        console.log('No data');
        return;
      }
      // console.log(response.data.data);
      setData(() => (response.data.data));
      SessionStorageManager().setItem(FREEJOAS, response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const cachedData = SessionStorageManager().getItem(FREEJOAS);
    if (cachedData) {
      setData(() => (cachedData));
      console.log("Cached data: ");
      return;
    }
    fetchData();
    console.log("Fetching data: ");

  }, []);

  useEffect(() => {
    const handleDeviceOrientation = event => {
      setDeviceOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        function (position) {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function (error) {
          console.error(`Error getting location: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (freejoaLocation && myCurrentCoordinates.latitude && myCurrentCoordinates.longitude) {
      const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
        var earthRadiusKm = 6371;

        var dLat = degreesToRadians(lat2 - lat1);
        var dLon = degreesToRadians(lon2 - lon1);

        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.floor((earthRadiusKm * c) * 1000);
      };

      const distanceInKm = distanceInKmBetweenEarthCoordinates(
        freejoaLocation.latitude,
        freejoaLocation.longitude,
        myCurrentCoordinates.latitude,
        myCurrentCoordinates.longitude
      );
      setDistance(distanceInKm);
    }
  }, [freejoaLocation, myCurrentCoordinates]);

  function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  function handleSelectItem(lat, lng, item) {
    setFreejoaLocation({
      latitude: lat,
      longitude: lng
    });

    setSelectedItem(item);
    handleRecentVisited(item);
    console.log("Recent visited: ", recentVisited);

    scrollToTop();
  }

  return (
    <section className="explore w-full main-container flex flex-col">
      {/* <div className="logout-button">Logout</div> */}
      <div className="main-container--top flex flex-col">
        <div className="flex flex-col gap-8 w-full">
          <p className="page-title">Explore</p>
        </div>
        <div className="flex-1 flex flex-col">
          <section className="flex">
            {freejoaLocation ? (
              <div className="standout ">
                <div className="movement">
                  <div className="movement--arrow w-full flex justify-center"><img src={ArrowUpwardIcon} alt="arrow" id="arrow" /></div>
                  <div className="movement--text">
                    <span className="text-lg">You are</span>
                    <NumberToColorGradient number={distance} />
                    <span className="text-lg">meters from your destination</span>
                  </div>
                  <Arrow
                    targetLatitude={freejoaLocation.latitude}
                    targetLongitude={freejoaLocation.longitude}
                    currentLatitude={myCurrentCoordinates.latitude}
                    currentLongitude={myCurrentCoordinates.longitude}
                    deviceOrientation={deviceOrientation} // Make sure you have deviceOrientation state in your Play component
                  />
                </div>
                <div className="locations-list--item selected">
                  {selectedItem.image ? (
                    <div className="location-list--item-image" style={{
                      backgroundImage: `url(${selectedItem.image[0].data})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}>

                    </div>
                  ) : (
                    <div className="location-list--item-image" style={{
                      backgroundImage: `url(${LogoPlaceholder})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}></div>
                  )}
                  <div className="location-list--item-container">
                    <div className="location-list--item-filter">
                      {/* <span>Under 1 km</span> */}
                      <div className="location-list--item-tree">
                        <span>{selectedItem.amount}</span>
                        <FaTree />
                      </div>
                    </div>
                    <span className="location-list--item-title">{selectedItem.title}</span>
                    {/* <Probability text="High Probability" type="high" />
                    <div className="location-list--item-visited">
                      <em>Visited on 28/02/2024</em>
                    </div> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8"></div>
            )}
          </section>
          <section>
            <div className="explore-heading pb-4">
              <h1>Select a location</h1>
              {/* <h2>Filters</h2>
              <div className="filters">
                <div className="filter">Under 1 km</div>
                <div className="filter">Under 3 km</div>
                <div className="filter">Under 5 km</div>
              </div> */}
            </div>
            <ul className="locations-list">
              {!data ? (
                <div>Loading...</div>
              ) : (
                data.map(item => (
                  <li className="locations-list--item" key={item._id} onClick={() => handleSelectItem(item.latitude, item.longitude, item)}>
                    {item.image ? (
                      <div className="location-list--item-image" style={{
                        backgroundImage: `url(${item.image[0].data})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}>

                      </div>
                    ) : (
                      <div className="location-list--item-image" style={{
                        backgroundImage: `url(${LogoPlaceholder})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}></div>
                    )}
                    <div className="location-list--item-container">
                      <div className="location-list--item-filter">
                        {/* <span>Under 1 km</span> */}
                        <div className="location-list--item-tree">
                          <span>{item.amount}</span>
                          <FaTree />
                        </div>
                      </div>
                      <span className="location-list--item-title">{item.title}</span>
                      {/* <Probability text="High Probability" type="high" />
                      <div className="location-list--item-visited">
                        <em>Visited on 28/02/2024</em>
                      </div> */}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>
      <div className="main-container--bottom">
        <Navigation />
      </div>
    </section>
  );
}

export default Play;
