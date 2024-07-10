import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import mapStyles from './GoogleMapStyles';
import config from '../utils/config';


const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -36.8571789,
    lng: 174.7389711
};

const myPosition = {
    lat: -36.8571789,
    lng: 174.7389711
};

const MapContainer = ({ data }) => {
    return (
        <LoadScript
            googleMapsApiKey={config.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={{
                    styles: mapStyles,
                    streetViewControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    mapTypeId: 'terrain',
                }}
            >
               
                { /* Child components, such as markers, info windows, etc. */}
                {data.map((point, index) => {
                    const lat = parseFloat(point.latitude);
                    const lng = parseFloat(point.longitude);
                    if (!isNaN(lat) && !isNaN(lng)) {
                        console.log('Valid latitude and longitude');
                        console.log(lat, lng);
                        return (
                            <Marker
                                key={index}
                                position={{ lat: lat, lng: lng }}
                            />
                        );
                    }
                    console.log('Invalid latitude or longitude');
                    return null;
                })}
            </GoogleMap>
        </LoadScript>
    );
}



export default MapContainer;
