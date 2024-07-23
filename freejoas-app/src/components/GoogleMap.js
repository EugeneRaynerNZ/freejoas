import React, { useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import config from "../utils/config";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useUserLocation, useSelectedItem } from "../utils/AppContext";

const MyMap = ({ point }) => {
  // to get the map object instance
  const map = useMap("freejoaMap");

  useEffect(() => {
    if (!map) {
      return;
    }
    // if the map and point are available
    if (point) {
      // recenter the map to the selected point
      console.log("Selected Point", point);
      map.setCenter({
        lat: parseFloat(point.latitude),
        lng: parseFloat(point.longitude),
      });
      /**
       *  adjust the zoom level to the selected point
       */
      map.setZoom(16);
    }
  }, [map, point]);
};

const MapContainer = ({ markerData }) => {

  const { userLocation } = useUserLocation();
  const { selectedItem, setSelectedItem } = useSelectedItem();


  const containerStyle = {
    width: "100%",
  };

  const initalCameraProps = {
    center: { lat: -36.848461, lng: 174.763336 }, // Auckland City
    zoom: 12, // default zoom level, New Zealand
  };

  const handleMarkerClick = (point) => {
    setSelectedItem(point);
  };

  const handleInfoWindowClose = () => {
    setSelectedItem(null);
  };

  return (
    <APIProvider apiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={containerStyle}>
        <Map
          id="freejoaMap"
          defaultZoom={initalCameraProps.zoom}
          defaultCenter={userLocation || initalCameraProps.center}
          mapId={config.REACT_APP_GOOGLE_MAPS_ID}
          disableDefaultUI={true}
          zoomControl={true}
        >
          {userLocation && (
            /**
             *  This is the user location marker
             */
            <AdvancedMarker position={userLocation}>
              {/* **put your custom icon here   *********************************************************************/}
              <MyLocationIcon color="primary" />
            </AdvancedMarker>
          )}
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

          {selectedItem && (
            <>
              {/* This is the map that will recenter to the selected marker */}
              <MyMap point={selectedItem} />

              <InfoWindow
                position={{
                  lat: parseFloat(selectedItem.latitude),
                  lng: parseFloat(selectedItem.longitude),
                }}
                onCloseClick={()=>{handleInfoWindowClose()}}
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
                    src={selectedItem.image[0].data}
                    alt="feijoa tree"
                  />
                  <h2>{selectedItem.title}</h2>
                  {/* <p>{selectedMarker.latitude}</p>
                <p>{selectedMarker.longitude}</p> */}
                </div>
              </InfoWindow>
            </>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapContainer;
