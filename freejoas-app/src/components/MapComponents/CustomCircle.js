import React, { useEffect, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { useUserLocation } from '../../contexts/UserLocationContext';

const CustomCircle = ({ radius, options }) => {
  const map = useMap("freejoa-map");
  const [circle, setCircle] = useState(null);
    const { userLocation } = useUserLocation();

  useEffect(() => {
    if (!map) return;

    const newCircle = new window.google.maps.Circle({
      map,
      userLocation,
      radius,
      ...options
    });

    setCircle(newCircle);

    return () => {
      if (newCircle) {
        newCircle.setMap(null);
      }
    };
  }, [map]);

  useEffect(() => {
    if (!circle) return;

    circle.setCenter(userLocation);
    circle.setRadius(radius);
    circle.setOptions(options);
  }, [circle, userLocation, radius, options]);

  return null;
};

export default CustomCircle;