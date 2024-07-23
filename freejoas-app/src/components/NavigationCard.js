import React, { useEffect, useState } from "react";
import Arrow from "./Arrow";
import NumberToColorGradient from "./ColourGenerator";
import ArrowUpwardIcon from '../images/arrow.svg';
import LogoPlaceholder from "../images/example-2.svg";
import { FaTree } from "react-icons/fa";
import { useUserLocation, useSelectedItem } from "../utils/AppContext";

function NavigationCard() {
  const { userLocation } = useUserLocation();
  const { selectedItem } = useSelectedItem();

  const [distance, setDistance] = useState(0); // distance between the user and the selected item

  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  useEffect(() => {
    const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
      let earthRadiusKm = 6371;
  
      let dLat = degreesToRadians(lat2 - lat1);
      let dLon = degreesToRadians(lon2 - lon1);
  
      lat1 = degreesToRadians(lat1);
      lat2 = degreesToRadians(lat2);
  
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.floor(earthRadiusKm * c * 1000);
    };

    // calculate the distance between the user and the selected item
    if (userLocation && selectedItem) {
      const distance = distanceInKmBetweenEarthCoordinates(
        userLocation.lat,
        userLocation.lng,
        selectedItem.latitude,
        selectedItem.longitude
      );

      setDistance(distance);
    }

   
  }, [userLocation, selectedItem]);

  useEffect(() => {
    const handleDeviceOrientation = (event) => {
      setDeviceOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  return (
    <div>
      <div className="standout ">
        <div className="movement">
          <div className="movement--arrow w-full flex justify-center">
            <img src={ArrowUpwardIcon} alt="arrow" id="arrow" />
          </div>
          <div className="movement--text">
            <span className="text-lg">You are</span>
            <NumberToColorGradient number={distance} />
            <span className="text-lg">meters from your destination</span>
          </div>
          <Arrow
            targetLatitude={selectedItem.latitude}
            targetLongitude={selectedItem.longitude}
            currentLatitude={userLocation.latitude}
            currentLongitude={userLocation.longitude}
            deviceOrientation={deviceOrientation} // Make sure you have deviceOrientation state in your Play component
          />
        </div>
        <div className="location-list--item selected">
          {selectedItem ? (
            <div
              className="location-list--item-image"
              style={{
                backgroundImage: `url(${selectedItem.image[0].data})`,
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
                <span>{selectedItem.amount}</span>
                <FaTree />
              </div>
            </div>
            <span className="location-list--item-title">
              {selectedItem.title}
            </span>
            {/* <Probability text="High Probability" type="high" />
                    <div className="location-list--item-visited">
                      <em>Visited on 28/02/2024</em>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationCard;