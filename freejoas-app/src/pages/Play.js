import { useState, useEffect } from 'react';
import '../App.css';
import axios from "axios";


function Play() {

    // const stableCoordinates = {lat: -36.863617, lng: 174.744042}
    const [location, setLocation] = useState(0)
    const [myCurrentCoordinates, setCoordinates] = useState(0);
    const [distance, getDistance] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
      // Fetch data from the server
      axios.get('http://localhost:4000/api/freejoas')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

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

  function handleSelectItem(itemId){
    console.log(itemId)
    console.log(data)

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
    }

    getDistance(distanceInKmBetweenEarthCoordinates(
      location.latitude,
      location.longitude,
      myCurrentCoordinates.lat,
      myCurrentCoordinates.lng
    ))

    setLocation(data.find(x => x.id === itemId))

    console.log(location)
  }
      
  return (
    <div id="play" className="flex justify-center max-w-xl mx-auto my-0">

      <section>
        <ul className="locations-list">
          {data.map(item => (
            <li className="p-2 flex flex-col" key={item.id} onClick={() => handleSelectItem(item.id)}>
              <span>{item.id}</span>
              <span>Latitude: {item.latitude}</span>
              <span>Longitude: {item.longitude}</span>
              <span>Description: {item.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div>Current: {myCurrentCoordinates.lat} : {myCurrentCoordinates.lng}</div>
        <div>Dummy Data: {location.lat} : {location.lng}</div>
        <div>Distance: {distance} meters away</div>
      </section>

    </div> 
  );
}

export default Play;