import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import config from '../utils/config';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -36.8571789,
    lng: 174.7389711
};

const MapContainer = () => {   
    return (
        <LoadScript
            googleMapsApiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    );
}

export default MapContainer;
