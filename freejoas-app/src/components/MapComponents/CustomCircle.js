/**
 * A custom circle component for displaying a circle on a map.
 * @param {number} radius - The radius of the circle in meters.
 * @param {object} options - Additional options for customizing the circle.
 * @returns {null}
 */
import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useUserLocation } from "../../contexts/UserLocationContext";

const CustomCircle = ({ radius, options }) => {
  const map = useMap("freejoa-map");
  const [circle, setCircle] = useState(null);
  const { userLocation } = useUserLocation();

  // Create a new circle when the map is loaded
  useEffect(() => {
    if (!map) return;

    // Create a new circle based on the user's location
    const newCircle = new window.google.maps.Circle({
      map,
      userLocation,
      radius,
      ...options,
    });

    setCircle(newCircle);

    return () => {
      if (newCircle) {
        newCircle.setMap(null); // Remove the circle from the map
      }
    };
    // eslint-disable-next-line
  }, [map]);

  // Update the circle when the user location, radius, or options change
  useEffect(() => {
    if (!circle) return;

    circle.setCenter(userLocation); // Update the circle's center
    circle.setRadius(radius);    // Update the circle's radius
    circle.setOptions(options);  // Update the circle's options
  }, [circle, userLocation, radius, options]);

  return null;
};

export default CustomCircle;
