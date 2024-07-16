import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import config from "../utils/config";

const MapContainer = ({ markerData, defaultPosition }) => {
  const map = useMap("freejoaMap");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState(defaultPosition);
  const [zoom, setZoom] = useState(6);

  const [camera, setCamera] = useState(null);

  const containerStyle = {
    width: "100%",
  };

  const initalCameraProps = {
    center: defaultPosition,
    zoom: 6,
  };

  // we need to change this so that we get the users current location which should be passed down from the Geolocation

  const updateCamera = (lat, lng, newZoom) => {
    setCamera({
      center: { lat: lat, lng: lng },
      zoom: newZoom,
    });
  };

  const handleMarkerClick = (point) => {
    setSelectedMarker(point);
    updateCamera({ lat: point.latitude, lng: point.longitude }, 15);
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
          camera={camera}
          onCameraChange={(newCamera) => setCamera(newCamera)}
          className="GoogleMap"
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
            <InfoWindow
              position={{
                lat: parseFloat(selectedMarker.latitude),
                lng: parseFloat(selectedMarker.longitude),
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <img
                  src={selectedMarker.image[0].data}
                  alt="feijoa tree"
                  style={{ width: "100%", height: "200px" }}
                />
                <h2>{selectedMarker.title}</h2>
                {/* <p>{selectedMarker.latitude}</p>
                <p>{selectedMarker.longitude}</p> */}
              </div>
            </InfoWindow>
          )}
        </Map>
    </div>
      </APIProvider>
  );
};

export default MapContainer;
