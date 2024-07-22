import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import config from "../utils/config";


const MyMap = ({ point }) => {
  // to get the map object instance
  const map = useMap("freejoaMap");

  useEffect(() => {
    if (map) {
      console.log("map loaded");
    }

    if (point) {
      // recenter the map to the selected point
      console.log("Selected Point",point);
      map.setCenter({
        lat: parseFloat(point.latitude),
        lng: parseFloat(point.longitude),
      });
      map.setZoom(16);
    }
  }, [map]);
};


const MapContainer = ({ markerData, defaultPosition }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const containerStyle = {
    width: "100%",
  };

  const initalCameraProps = {
    center: defaultPosition,
    zoom: 6,
  };

  // we need to change this so that we get the users current location which should be passed down from the Geolocation

  const handleMarkerClick = (point) => {
    setSelectedMarker(point);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    console.log("Goole Map started");
  }, []);

  return (
    <APIProvider apiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={containerStyle}>
        <Map
          id="freejoaMap"
          defaultZoom={initalCameraProps.zoom}
          defaultCenter={initalCameraProps.center}
          mapId={config.REACT_APP_GOOGLE_MAPS_ID}
          disableDefaultUI={true}
          zoomControl={true}
        >
          {markerData.map((point, index) => {
            const lat = parseFloat(point.latitude);
            const lng = parseFloat(point.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <AdvancedMarker
                  key={index}
                  position={{ lat: lat, lng: lng }}
                  onClick={() => handleMarkerClick(point)}
                />
              );
            }
            console.log("Invalid latitude or longitude");
            return null;
          })}

          {selectedMarker && (
            <>
              <InfoWindow
                position={{
                  lat: parseFloat(selectedMarker.latitude),
                  lng: parseFloat(selectedMarker.longitude),
                }}
                onCloseClick={handleInfoWindowClose}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <img
                    style={{ width: "150px" }}
                    src={selectedMarker.image[0].data}
                    alt="feijoa tree"
                  />
                  <h2>{selectedMarker.title}</h2>
                  {/* <p>{selectedMarker.latitude}</p>
                <p>{selectedMarker.longitude}</p> */}
                </div>
              </InfoWindow>
              {/* This is the map that will recenter to the selected marker */}
              <MyMap point={selectedMarker} />
            </>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapContainer;

