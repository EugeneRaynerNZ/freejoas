import { useState } from 'react';
import '../App.css';
import axios from "axios";


function Upload() {

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
       <div id="upload">

        <div className="flex gap-4 flex-column">
          <h4 style={{textAlign: 'center'}}>Add a new location</h4>
          <form style={{display: 'flex', flexDirection: 'column', rowGap: "16px"}}>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="latitude" value={inputs.latitude || ''} onChange={handleChange} placeholder="lat"/>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="longitude" value={inputs.longitude || ''} onChange={handleChange} placeholder="lng"/>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="description" placeholder="description" value={inputs.description || ''} onChange={handleChange} />
          </form>
        </div>

        <button onClick={handleClick}>Do Something Button</button>

        </div> 
    );
}

export default Upload;