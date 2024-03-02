import { useState, useEffect } from 'react';
import '../App.css';
import axios from '../axios';
import { FaTree } from "react-icons/fa";
import Navigation from "../Navigation";
import ExampleData from "../data.json";


function Play() {
  // const stableCoordinates = {lat: -36.863617, lng: 174.744042}
  const [freejoaLocation, setFreejoaLocation] = useState(0)
  const [myCurrentCoordinates, setCoordinates] = useState(0);
  const [distance, getDistance] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function fetchData() {
      try {
        const response = await axios.get('/freejoas');
        console.log(response)
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
    // if [], run once when the row loads, and don't run again (only on page load)
  }, []);

  useEffect(() => {

    // Check if the Geolocation API is supported by the browser
    if ("geolocation" in navigator) {
      // Use watchPosition to continuously monitor the device's location
      const watchId = navigator.geolocation.watchPosition(
        // Success callback function
        function (position) {

          // Update the state with the new position
          setCoordinates({ 
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
          });

          if(freejoaLocation) {
            getDistance(
              distanceInKmBetweenEarthCoordinates(
                freejoaLocation.latitude,
                freejoaLocation.longitude,
                myCurrentCoordinates.latitude,
                myCurrentCoordinates.longitude
              )
            )
          }

          console.log(myCurrentCoordinates)
        },
        // Error callback function
        function (error) {
          // Handle errors, such as permission denied or unable to retrieve location
          console.error(`Error getting location: ${error.message}`);
        },
        // Options object (optional)
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup the watchPosition when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [freejoaLocation]);

  useEffect(() => {
    if(freejoaLocation) {
      getDistance(
        distanceInKmBetweenEarthCoordinates(
          freejoaLocation.latitude,
          freejoaLocation.longitude,
          myCurrentCoordinates.latitude,
          myCurrentCoordinates.longitude
        )
      )

      console.log(distance)
    }
  }, [myCurrentCoordinates])

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

    setFreejoaLocation({
      latitude: lat,
      longitude: lng
    })
  }
  
      
  return (
    <div id="play" className="flex flex-col justify-center gap-4 max-w-3xl my-0 w-full">

      <div className="flex-1 flex flex-col pt-8 gap-2">
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

        <section className="basis-2/4 px-4">
          <ul className="locations-list flex flex-col gap-4 max-h-96 overflow-y-auto pb-2">
            {/* {!data ? (
            <div>Please select a location to begin</div>
            ) : ( */}
            {ExampleData.map(item => (
              <li className="p-2 flex flex-col gap-2 shadow-md cursor-pointer hover:shadow-lg transition-shadow rounded-md" key={item._id} onClick={() => handleSelectItem(item.latitude, item.longitude)}>
                <span className="text-slate-700  font-bold">{item.title}</span>
                <div className="flex gap-2">
                  <div className="icon--container flex gap-1"><FaTree /><span>{item.amount}</span></div>
                </div>
                <div className="flex">
                  <div><span>Updated at:{new Date(item.updatedAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</span> by <span>{item.username}</span></div>
                </div>
              </li>
            ))}
            {/* )} */}
          </ul>
        </section>
      </div>

<Navigation />
</div> 

  );
}

export default Play;