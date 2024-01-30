import { useState, useEffect } from 'react';
import '../App.css';
import axios from "axios";

function Play() {
  // const stableCoordinates = {lat: -36.863617, lng: 174.744042}
  const [location, setLocation] = useState(false)
  const [myCurrentCoordinates, setCoordinates] = useState(0);
  const [distance, getDistance] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    if (!location) {
      axios.get('http://localhost:4000/api/freejoas')
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    
  }, [location]);

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
    console.log('itemId ' + itemId)
    console.log('data ' + data)

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

    console.log(`Location I want to go to: ${location.latitude} : ${location.longitude}`)
    console.log(`My Current Location: ${myCurrentCoordinates.lat} : ${myCurrentCoordinates.lng}`)
  }
      
  return (
    <div id="play" className="flex justify-center gap-4 max-w-xl mx-auto my-0">

      <section className="basis-2/4">
        <ul className="locations-list flex flex-col gap-4 max-h-96 overflow-y-scroll pb-2">
          {data.map(item => (
            <li className="p-2 flex flex-col shadow-md cursor-pointer hover:shadow-lg transition-shadow rounded-md" key={item.id} onClick={() => handleSelectItem(item.id)}>
              {/* <span>Latitude: {item.latitude}</span>
              <span>Longitude: {item.longitude}</span> */}
              <span>Description: {item.description}</span>
              {/* to add */}
              <span>Estimated amount of trees: 0</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex basis-2/4 items-center justify-center">
        {location === 0 ? (
          <div>Please select a location to begin</div>
        ) : (
          <div className="flex flex-col gap-2 text-center">
          <span className="text-lg">You are</span> 
          <span className="text-4xl text-blue-600">{distance}</span>
          <span className="text-lg">meters from<br />your destination</span>
        </div>
        )}
      </section>

    </div> 
  );
}

export default Play;