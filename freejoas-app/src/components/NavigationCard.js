import React, { useEffect, useState } from "react";
import Arrow from "./Arrow";
import NumberToColorGradient from "./ColourGenerator";
import ArrowUpwardIcon from "../images/arrow.svg";
import useDistance from "../utils/DistanceFilter";
import { useUserLocation } from "../contexts/UserLocationContext";
import { useSelectedFreejoa } from "../contexts/SelectedFreejoaContext";
import Logger from "../utils/Logger";

function NavigationCard() {
  // global state
  const { userLocation } = useUserLocation();
  const { selectedFreejoa } = useSelectedFreejoa();
  const { calculateDistance } = useDistance();

  // local state
  const [distance, setDistance] = useState(0); // distance between the user and the selected item
  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    Logger.info("NavigationCard Loaded");
    if (userLocation && selectedFreejoa) {
      const distance = calculateDistance(userLocation, selectedFreejoa);
      setDistance(distance);
      Logger.info("Distance calculated", distance);
    }
    // eslint-disable-next-line
  }, [userLocation, selectedFreejoa]);

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
        {
          // check all the props are available before rendering the Arrow component
          userLocation && selectedFreejoa && deviceOrientation && (
            <Arrow
              targetLatitude={selectedFreejoa.latitude}
              targetLongitude={selectedFreejoa.longitude}
              currentLatitude={userLocation.lat}
              currentLongitude={userLocation.lng}
              deviceOrientation={deviceOrientation} // Make sure you have deviceOrientation state in your Play component
            />
          )
        }
      </div>
    </div>
  );
}

export default NavigationCard;
