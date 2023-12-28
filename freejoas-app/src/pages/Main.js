import Navigation from '../Navigation';
import { useState } from 'react';
import '../App.css';

function Main() {

    const stableCoordinates = {lat: -36.863617, lng: 174.744042}
    const [coordinates, setCoordinates] = useState('Taylor');
    const [distance, getDistance] = useState(0);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };

                setCoordinates(pos)

                getDistance(distanceInKmBetweenEarthCoordinates(
                    stableCoordinates.lat,
                    stableCoordinates.lng,
                    coordinates.lat,
                    coordinates.lng
                ))
              },
              (e) => {
                console.log(e)
              }
            );
          } else {
            console.log('fail 2')
          }
    }

    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
      
    function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6371;
      
        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);
      
        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    }

    
      
    return (
    <>
        <Navigation />

        <main>
        <button id="demo" onClick={getLocation}>Click me for coordinates</button>
        
        </main>

        <section>
            <div>Current: {coordinates.lat} : {coordinates.lng}</div>
            <div>Dummy Data: {stableCoordinates.lat} : {stableCoordinates.lng}</div>

            <div>Distance: {Math.floor(distance * 1000)} meters away</div>
        </section>

    </>
    );
}

export default Main;