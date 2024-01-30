import { useState } from 'react';
import '../App.css';
import axios from "axios";


function Upload() {

    const [inputs, setInputs] = useState({});
    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    function handleClick() {
      if(inputs.latitude && inputs.longitude && inputs.amount && inputs.title) {
        axios.post('http://localhost:4000/api/newfreejoa', {
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          amount: inputs.amount,
          status: true,
          title: inputs.title
        })

        inputs.latitude = '';
        inputs.longitude = '';
        inputs.amount = '';
        inputs.title = '';

      } else {
        console.log('please input all required fields')
      }
    }
      
    return (
       <div id="upload">

        <div className="flex gap-4 flex-col max-w-xl mx-auto my-0">
          <h4 className="text-center">Add a new location</h4>
          <form className="flex flex-col gap-2">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="latitude" value={inputs.latitude || ''} onChange={handleChange} placeholder="lat"/>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="longitude" value={inputs.longitude || ''} onChange={handleChange} placeholder="lng"/>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="amount" placeholder="amount of trees" value={inputs.amount || ''} onChange={handleChange} />
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" placeholder="title" value={inputs.title || ''} onChange={handleChange} />
          </form>
          <button className="bg-green-700 text-white rounded p-2" onClick={handleClick}>Add a new location now</button>
        </div>

        

        </div> 
    );
}

export default Upload;