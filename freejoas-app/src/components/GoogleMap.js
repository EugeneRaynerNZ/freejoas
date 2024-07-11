import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import mapStyles from "./GoogleMapStyles";
import config from "../utils/config";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -36.8571789,
  lng: 174.7389711,
};

const myPosition = {
  lat: -36.8571789,
  lng: 174.7389711,
};

const mapOptions = {
  styles: mapStyles,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  mapTypeId: "terrain",
};

const MapContainer = ({ data }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  return (
    <APIProvider apiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={containerStyle}>
        <Map
          zoom={12}
          center={center}
          mapId={config.REACT_APP_GOOGLE_MAPS_ID}
          mapOptions={mapOptions}
        >
          <AdvancedMarker
            position={myPosition}
            onClick={() => setInfoWindowOpen(true)}
          ></AdvancedMarker>
          {infoWindowOpen && (
            <InfoWindow
              position={myPosition}
              onCloseClick={() => setInfoWindowOpen(false)}
            >
              <div>
                <h1>My Location </h1>
                <h2>Lat: {myPosition.lat}</h2>
                <h2>Lng: {myPosition.lng}</h2>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>

    // <LoadScript
    //     googleMapsApiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}
    //     loadingElement={<div>Loading...</div>}
    //      version="weekly"
    // >
    //   <GoogleMap
    //     mapContainerStyle={containerStyle}
    //     center={center}
    //     zoom={12}
    //     options={mapOptions}
    //   >
    //     {/* Child components, such as markers, info windows, etc. */}
    //     {/* <Marker
    //                 position={myPosition}
    //            ></Marker> */}
    //     {data.map((point, index) => {
    //       const lat = parseFloat(point.latitude);
    //       const lng = parseFloat(point.longitude);
    //       if (!isNaN(lat) && !isNaN(lng)) {
    //         return <Marker key={index} position={{ lat: lat, lng: lng }} />;
    //       }
    //       console.log("Invalid latitude or longitude");
    //       return null;
    //     })}
    //   </GoogleMap>
    // </LoadScript>
  );
};

export default MapContainer;
