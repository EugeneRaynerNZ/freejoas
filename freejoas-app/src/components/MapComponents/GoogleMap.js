import React from "react";
import PropTypes from "prop-types";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Environment } from "../../utils/config";
import CustomMap from "./CustomMap";
import { useUserLocation } from "../../contexts/UserLocationContext";

const MapContainer = ({ markerData, filterLevel }) => {
  const { userLocation } = useUserLocation();
  const containerStyle = {
    width: "100%",
  };

  const initalCameraProps = {
    center: { lat: -36.848461, lng: 174.763336 }, // Auckland City
    zoom: 12, // default zoom level, New Zealand
  };

  return (
    <APIProvider apiKey={Environment.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={containerStyle}>
        <Map
          id="freejoa-map"
          defaultZoom={initalCameraProps.zoom}
          defaultCenter={userLocation || initalCameraProps.center}
          mapId={Environment.REACT_APP_GOOGLE_MAPS_ID}
          disableDefaultUI={true}
          zoomControl={true}
        >
          <CustomMap markerData={markerData} filterLevel={filterLevel} />
        </Map>
        </div>

    </APIProvider>
  );
};

MapContainer.propTypes = {
  markerData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
      image: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.string.isRequired,
        })
      ).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterLevel: PropTypes.string.isRequired,
};

export default MapContainer;
