import { useState } from 'react';
import '../../App.css';
import axios from '../../axios';
import Navigation from "../../Navigation";


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
       <div className="flex flex-col w-full pt-8 main-container">

       <div className="flex-1 flex flex-col gap-2 mx-8 main-container--top">
        <div className="flex gap-8 flex-col max-w-xl my-0">
          <div className="flex flex-col gap-8 w-full">
            <p className="page-title">Upload</p>
          </div>
          <div className="w-full">
            <form className="flex flex-col gap-6 mb-16">
              <div className="flex flex-col gap-4">
                <label className="input--container">
                    <span>Your Latitude</span>
                    <input type="text" name="latitude" value={inputs.latitude || ''} onChange={handleChange} placeholder="-34.2512" />
                </label>
                <label className="input--container">
                    <span>Your Longitude</span>
                    <input type="text" name="longitude" value={inputs.longitude || ''} onChange={handleChange} placeholder="-32.5123" />
                </label>
                <div onClick={getCurrentLocation} className="get-my-location">Get my location</div>
              </div>
              <label className="input--container">
                  <span>How many trees?</span>
                  <input type="text" name="amount" value={inputs.amount || ''} onChange={handleChange} placeholder="2" />
              </label>
              <label className="input--container">
                  <span>Name the location</span>
                  <input type="text" name="title" value={inputs.title || ''} onChange={handleChange} placeholder="Snazzy Location Name" />
              </label>
              {/* <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="latitude" value={inputs.latitude || ''} onChange={handleChange} placeholder="lat"/>
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="longitude" value={inputs.longitude || ''} onChange={handleChange} placeholder="lng"/>
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="amount" placeholder="amount of trees" value={inputs.amount || ''} onChange={handleChange} />
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" placeholder="title" value={inputs.title || ''} onChange={handleChange} /> */}
            </form>
            <button className="bg-green-700 text-white rounded p-2 w-full cta--button" onClick={handleClick}>Upload Location</button>
          </div>
        </div>
       </div>

        
        <div className="main-container--bottom">
          <Navigation />
        </div>
        </div> 
    );
}

export default Upload;