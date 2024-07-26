import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import {Environment} from "../utils/config";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useUserLocation, useSelectedItem } from "../utils/AppContext";


const useCenterMap = (center, zoom) => {
  const map = useMap("freejoaMap");

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
      if (zoom) {
        map.panTo(zoom);
      }
    }
  }, [map, center, zoom]);

  return map;
};

// export my map that receives a range of filter
export const MyMapRange = ({ range }) => {

  const { userLocation } = useUserLocation();
  let zoom;

  switch (range) {
    case 1000:
      zoom = 16;
      break;
    case 3000:
      zoom = 14;
      break;
    case 5000:
      zoom = 13;
      break;
    default:
      zoom = 12;
  }

  useCenterMap(userLocation, zoom);

  return null;
};

MyMapRange.propTypes = {
  range: PropTypes.number,
};

const MapContainer = ({ markerData , range }) => {

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

  useEffect(()=>{
    if(markerData){
      console.log("Marker data loaded");
    }else{
      console.log("No marker data loaded");
    }
  }, [markerData]);

  return (
    <APIProvider apiKey={Environment.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={containerStyle}>
        <Map
          id="freejoaMap"
          defaultZoom={initalCameraProps.zoom}
          defaultCenter={userLocation || initalCameraProps.center}
          mapId={Environment.REACT_APP_GOOGLE_MAPS_ID}
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
          {markerData.map((point) => {
            const lat = parseFloat(point.latitude);
            const lng = parseFloat(point.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <AdvancedMarker
                  key={point.id}
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
              <MyMapRange range={range} />

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

MapContainer.propTypes = {
  markerData: PropTypes.array,
  range: PropTypes.number,
};

export default MapContainer;
