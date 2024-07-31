import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AdvancedMarker, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useUserLocation } from "../../contexts/UserLocationContext";
import { useSelectedFreejoa } from "../../contexts/SelectedFreejoaContext";
import logger from "../../utils/Logger";
import CustomCircle from "./CustomCircle";

const CustomMap = ({ markerData, filterLevel }) => {
  const map = useMap("freejoa-map");
  const { userLocation } = useUserLocation();
  const { selectedFreejoa, setSelectedFreejoa } = useSelectedFreejoa();

  const handleMarkerClick = (point) => {
    setSelectedFreejoa(point);
  };

  const handleInfoWindowClose = () => {
    setSelectedFreejoa(null);
  };

  const handleFilterLevelChange = (level) => {
    map.panTo(userLocation);

    switch (level) {
      case 1000:
        map.setZoom(15);
        break;
      case 3000:
        map.setZoom(14);
        break;
      case 5000:
        map.setZoom(13);
        break;
      default:
        map.setZoom(12);
        break;
    }
  };

  useEffect(() => {
    logger.debug("MyMap loaded -- filterLevel: ", filterLevel);
    if (filterLevel) {
      handleFilterLevelChange(filterLevel);
    }
    // eslint-disable-next-line
  }, [map, filterLevel]);

  useEffect(() => {
    logger.debug("MyMap loaded -- selectedFreejoa: ", selectedFreejoa);
    if (selectedFreejoa) {
      map.panTo({
        lat: parseFloat(selectedFreejoa.latitude),
        lng: parseFloat(selectedFreejoa.longitude),
      });
      map.setZoom(15);
    }
  }, [map, selectedFreejoa]);

  return (
    <>
      {userLocation && (
        /**
         *  This is the user location marker
         */
        <>
          <AdvancedMarker key="user-location" position={userLocation}>
            {/* **put your custom icon here   *********************************************************************/}
            <MyLocationIcon color="primary" />
          </AdvancedMarker>
          <CustomCircle
            radius={filterLevel}
            options={{
              fillColor: "blue",
              fillOpacity: 0.1,
              strokeColor: "blue",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </>
      )}

      {/*
       *  These are the markers that will be displayed on the map
       */}
      {markerData &&
        markerData.length > 0 &&
        markerData.map((point) => {
          const lat = parseFloat(point.latitude);
          const lng = parseFloat(point.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            return (
              <AdvancedMarker
                key={point._id}
                position={{ lat: lat, lng: lng }}
                onClick={() => handleMarkerClick(point)}
              />
            );
          }
          logger.warning(
            `Invalid marker data for freejoa id ${point._id}:`,
            point
          );
          return null;
        })}

      {/* This is the map that will recenter to the selected marker */}
      {selectedFreejoa && (
        <InfoWindow
          key={selectedFreejoa._id}
          position={{
            lat: parseFloat(selectedFreejoa.latitude),
            lng: parseFloat(selectedFreejoa.longitude),
          }}
          onCloseClick={() => {
            handleInfoWindowClose();
          }}
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
              src={selectedFreejoa.image[0].data}
              alt="feijoa tree"
            />
            <h2>{selectedFreejoa.title}</h2>
            {/* <p>{selectedMarker.latitude}</p>
                  <p>{selectedMarker.longitude}</p> */}
          </div>
        </InfoWindow>
      )}
    </>
  );
};

CustomMap.propTypes = {
  markerData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
      image: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  filterLevel: PropTypes.number,
};

export default CustomMap;
