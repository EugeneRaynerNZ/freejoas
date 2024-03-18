import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useState } from 'react';
import '../../App.css';
import axios from '../../axios';
import Navigation from "../../Navigation";
import ImageUpload from "../../components/UploadImage"


function Upload() {
  const authContext = useContext(AuthContext);
  axios.defaults.headers.common['Authorization'] = `Bearer ${authContext.token}`;

  const [inputs, setInputs] = useState({});
  const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  function handleClick() {
    if(inputs.latitude && inputs.longitude && inputs.amount && inputs.title) {
      axios.post('http://localhost:4000/api/v1/freejoa/upload', {
        latitude: inputs.latitude,
        longitude: inputs.longitude,
        amount: inputs.amount,
        title: inputs.title,
        image: {data: base64Image}
      })

      setInputs({
        latitude: null,
        longitude: null,
        amount: null,
        status: null,
        title: null,
        base64Image: null
      })

    } else {
      console.log('please input all required fields')
    }
  }

  const [base64Image, setBase64Image] = useState('');

  const handleImageChange = (base64Image) => {
    setBase64Image(base64Image);
    console.log(base64Image)
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // You can access base64Image here for further processing
  //   console.log('Base64 Image:', base64Image);
  // };

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
              <ImageUpload onImageChange={handleImageChange}/>
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