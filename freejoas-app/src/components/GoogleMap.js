import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";
import config from "../utils/config";

const MapContainer = ({ data }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const containerStyle = {
    width: "100%",
  };

  // we need to change this so that we get the users current location which should be passed down from the Geolocation
  const myPosition = {
    lat: -36.8571789,
    lng: 174.7389711,
  };

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
          defaultZoom={6}
          defaultCenter={myPosition}
          mapId={config.REACT_APP_GOOGLE_MAPS_ID}
          disableDefaultUI={true}
          zoomControl={true}
          className="GoogleMap"
        >
          <Marker position={myPosition} />
          {data.map((point, index) => {
            const lat = parseFloat(point.latitude);
            const lng = parseFloat(point.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <AdvancedMarker 
                  key={index} 
                  position={{ lat: lat, lng: lng }}
                  onClick={() => handleMarkerClick(point)
              } />
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
                <img src={selectedMarker.image[0].data} alt="feijoa tree"/>
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
