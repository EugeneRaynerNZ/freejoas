import { useCallback } from "react";

// conver the distance from km to meters, then round it to the nearest meter
const convertDistanceToMeters = (distance) => Math.round(distance * 1000);

const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180; // Converts numeric degrees to radians

  const R = 6371; // Radius of the earth in km
  //the difference between the two latitudes and longitudes
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  //calculate the distance between the two points
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  //the central angle between the two points
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return convertDistanceToMeters(distance);
};

const useDistance = () => {
  // calculate the distance between two points
  const calculateDistance = useCallback((userLocation, itemLocation) => {
    if (!userLocation || !itemLocation) {
      console.log("need two points to calculate distance");
      return -1;
    }

    return haversineDistance(
      userLocation.lat,
      userLocation.lng,
      itemLocation.latitude,
      itemLocation.longitude
    );
  }, []);

  // filter points by distance
  const filterPointsByDistance = useCallback(
    (userLocation, itemLocations, maxDistance) => {
      // check if all the params are provided
      if (!userLocation || !itemLocations || !maxDistance) {
        console.log(
          "need user location, points and max distance to filter points"
        );
        return [];
      }

      // check if the itemLocations an array
      if (Array.isArray(itemLocations)) {
        console.log("itemLocations is an array");
        // filter the points by distance and return the points that are within the max distance
        return itemLocations.filter((itemLocation) => {
          const distance = haversineDistance(
            userLocation.lat,
            userLocation.lng,
            itemLocation.latitude,
            itemLocation.longitude
          );
          console.log("distance", distance);
          console.log("maxDistance", maxDistance);
          return distance <= maxDistance;
        });
      } else {
        console.log("itemLocations is an object");
        // check if the itemLocations is an object
        if (!itemLocations) return [];
        const distance = haversineDistance(
          userLocation.lat,
          userLocation.lng,
          itemLocations.latitude,
          itemLocations.longitude
        );
        return distance <= maxDistance ? [itemLocations] : [];
      }
    },
    []
  );

  return { calculateDistance, filterPointsByDistance };
};

export default useDistance;
