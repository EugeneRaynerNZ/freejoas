import { useState, useEffect } from 'react';
import '../App.css';
import axios from '../axios';
import { FaTree } from "react-icons/fa";

function Play() {
  // const stableCoordinates = {lat: -36.863617, lng: 174.744042}
  // const [location, setLocation] = useState(null)
  const [myCurrentCoordinates, setCoordinates] = useState(0);
  const [distance, getDistance] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/freejoas");
      console.log(request)
      setData(request.data)
    }
    
    fetchData();
    // if [], run once when the row loads, and don't run again (only on page load)
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

  function handleSelectItem(lat, lng){
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);

      getDistance(
        distanceInKmBetweenEarthCoordinates(
          lat,
          lng,
          myCurrentCoordinates.latitude,
          myCurrentCoordinates.longitude
        )
      )

    } else {
      console.log("Geolocation not supported");
    }
  }
  
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCoordinates({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }
      
  return (
    <div id="play" className="flex flex-col justify-center gap-4 max-w-3xl mx-auto my-0">

      <section className="flex basis-2/4 items-center justify-center">
        {/* {!location ? (
          <div>Please select a location to begin</div>
        ) : ( */}
          <div className="flex flex-col gap-2 text-center">
          <span className="text-lg">You are</span> 
          <span className="text-4xl text-blue-600">{distance}</span>
          <span className="text-lg">meters from<br />your destination</span>
        </div>
        {/* )} */}
      </section>

      <section className="basis-2/4">
        <ul className="locations-list flex flex-col gap-4 max-h-96 overflow-y-auto pb-2">
          {data.map(item => (
            <li className="p-2 flex flex-col gap-2 shadow-md cursor-pointer hover:shadow-lg transition-shadow rounded-md" key={item._id} onClick={() => handleSelectItem(item.latitude, item.longitude)}>
              <span className="text-slate-700  font-bold">{item.title}</span>
              <div className="flex gap-2">
                <div className="icon--container flex gap-1"><FaTree /><span>{item.amount}</span></div>
              </div>
            </li>
          ))}
        </ul>
      </section>

    </div> 
  );
}

export default Play;