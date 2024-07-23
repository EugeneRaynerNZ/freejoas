import React, { useEffect, useState } from "react";
import Arrow from "./Arrow";
import NumberToColorGradient from "./ColourGenerator";
import ArrowUpwardIcon from "../images/arrow.svg";
import LogoPlaceholder from "../images/example-2.svg";
import { FaTree } from "react-icons/fa";
import { useUserLocation, useSelectedItem } from "../utils/AppContext";
import useDistance from "../utils/DistanceFilter";

function NavigationCard() {
  const { userLocation } = useUserLocation();
  const { selectedItem } = useSelectedItem();
  const { calculateDistance } = useDistance();

  const [distance, setDistance] = useState(0); // distance between the user and the selected item

  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    console.log("NavigationCard loaded");
    if (userLocation && selectedItem) {
      const distance = calculateDistance(userLocation, selectedItem);
      setDistance(distance);
      console.log("distance", distance);
    }
    // eslint-disable-next-line
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
          {
            // check all the props are available before rendering the Arrow component
            userLocation && selectedItem && deviceOrientation && (
              <Arrow
                targetLatitude={selectedItem.latitude}
                targetLongitude={selectedItem.longitude}
                currentLatitude={userLocation.lat}
                currentLongitude={userLocation.lng}
                deviceOrientation={deviceOrientation} // Make sure you have deviceOrientation state in your Play component
              />
            )
          }
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
