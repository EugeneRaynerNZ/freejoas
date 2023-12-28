import { useState } from 'react';
import '../App.css';

function Play() {

    const stableCoordinates = {lat: -36.863617, lng: 174.744042}
    const [coordinates, setCoordinates] = useState(0);
    const [distance, getDistance] = useState(0);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };

                setCoordinates(pos)
                
                
              },
              (e) => {
                console.log(e)
              }
            );
          } else {
            console.log('fail 2')
          }

          getDistance(distanceInKmBetweenEarthCoordinates(
            stableCoordinates.lat,
            stableCoordinates.lng,
            coordinates.lat,
            coordinates.lng
          ))
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
        return Math.floor((earthRadiusKm * c) * 1000);
    }

    
      
    return (
       <div id="play">

        <section>
          <button id="demo" onClick={getLocation}>Click me for coordinates</button>
        </section>

        <section>
            <div>Current: {coordinates.lat} : {coordinates.lng}</div>
            <div>Dummy Data: {stableCoordinates.lat} : {stableCoordinates.lng}</div>

            <div>Distance: {distance} meters away</div>
        </section>

        </div> 
    );
}

export default Play;