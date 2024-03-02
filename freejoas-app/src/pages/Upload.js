import { useState } from 'react';
import '../App.css';
import axios from '../axios';
import Navigation from "../Navigation";


function Upload() {

    const [inputs, setInputs] = useState({});
    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    function handleClick() {
      if(inputs.latitude && inputs.longitude && inputs.amount && inputs.title) {
        axios.post('/newfreejoa', {
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          amount: inputs.amount,
          status: true,
          title: inputs.title
        })

        setInputs({
          latitude: null,
          longitude: null,
          amount: null,
          status: null,
          title: null
        })

      } else {
        console.log('please input all required fields')
      }
    }

    function getCurrentLocation(){
      if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
    }

    function success(position) {
      setInputs({
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      })
      console.log(inputs)
    }
    
    function error() {
      console.log("Unable to retrieve your location");
    }
      
    return (
       <div className="flex flex-col w-full pt-8" id="upload">

       <div className="flex-1 flex flex-col gap-2 mx-8">
        <div className="flex gap-16 flex-col max-w-xl my-0">
          <h4 className="text-center">Add a new location</h4>
            <div className="w-full">
              <h4 className="text-center mb-4">Enter from my current location</h4>
              <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={getCurrentLocation}>Get my current location</button>
            </div>
            <div className="w-full">
              <h4 className="text-center mb-4">Enter in precise coorindates</h4>
              <form className="flex flex-col gap-2 mb-16">
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="latitude" value={inputs.latitude || ''} onChange={handleChange} placeholder="lat"/>
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="longitude" value={inputs.longitude || ''} onChange={handleChange} placeholder="lng"/>
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="amount" placeholder="amount of trees" value={inputs.amount || ''} onChange={handleChange} />
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" placeholder="title" value={inputs.title || ''} onChange={handleChange} />
              </form>
              <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Add a new location now</button>
            </div>
          </div>
       </div>

        
        <Navigation />
        </div> 
    );
}

export default Upload;