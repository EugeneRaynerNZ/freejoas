import React from "react";
import Arrow from "../../components/Arrow";
import NumberToColorGradient from "../../components/NumberToColorGradient";
import ArrowUpwardIcon from "../../images/arrow.svg";
import LogoPlaceholder from "../../images/logo-placeholder.png";
import { FaTree } from "react-icons/fa";

import "../../App.scss";

function PlayMobile({selectedItem}) {
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
                    <span className="text-lg">
                      meters from your destination
                    </span>
                  </div>
                  <Arrow
                    targetLatitude={selectedItem.latitude}
                    targetLongitude={selectedItem.longitude}
                    currentLatitude={myCurrentCoordinates.latitude}
                    currentLongitude={myCurrentCoordinates.longitude}
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