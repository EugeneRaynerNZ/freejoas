import { useState, useEffect } from 'react';
import '../App.css';
import axios from "axios";


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

    const [inputs, setInputs] = useState({});
    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    function handleClick() {
      console.log(inputs);

      axios.post('http://localhost:4000/api/newfreejoa', {
        longitude: inputs.longitude,
        latitude: inputs.latitude,
        status: "available",
        description: inputs.description
      })
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

        <ul>
          {data.map(item => (
            <li key={item.id}>
              <h3>{item.id}</h3>
              <span>Latitude: {item.latitude}</span>
              <span>Longitude: {item.longitude}</span>
              <span>Description: {item.description}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 flex-column">
          <h4 style={{textAlign: 'center'}}>Add a new location</h4>
          <form style={{display: 'flex', flexDirection: 'column', rowGap: "16px"}}>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="longitude" value={inputs.longitude || ''} onChange={handleChange} />
            <input name="latitude" value={inputs.latitude || ''} onChange={handleChange} />
            <input name="description" placeholder="description" value={inputs.description || ''} onChange={handleChange} />
          </form>
        </div>

        <button onClick={handleClick}>Do Something Button</button>

        </div> 
    );
}

export default Play;