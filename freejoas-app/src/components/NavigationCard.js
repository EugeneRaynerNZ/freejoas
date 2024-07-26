import React, { useEffect, useState } from "react";
import Arrow from "./Arrow";
import NumberToColorGradient from "./ColourGenerator";
import ArrowUpwardIcon from "../images/arrow.svg";
import LogoPlaceholder from "../images/example-2.svg";
import { FaTree } from "react-icons/fa";
import useDistance from "../utils/DistanceFilter";
import { useUserLocation } from "../contexts/UserLocationContext";
import { useSelectedFreejoa } from "../contexts/SelectedFreejoaContext";

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
    console.log("NavigationCard loaded");
    if (userLocation && selectedFreejoa) {
      const distance = calculateDistance(userLocation, selectedFreejoa);
      setDistance(distance);
      console.log("distance", distance);
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
        <div className="location-list--item selected">
          {selectedFreejoa ? (
            <div
              className="location-list--item-image"
              style={{
                backgroundImage: `url(${selectedFreejoa.image[0].data})`,
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
                <span>{selectedFreejoa.amount}</span>
                <FaTree />
              </div>
            </div>
            <span className="location-list--item-title">
              {selectedFreejoa.title}
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
