import React, { useState } from 'react';
import axios from '../axios';

function UploadImage() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = (event) => {
        event.preventDefault();

        if (selectedFile) {
            //show the file details in console
            console.log('Selected file:', selectedFile );
            // console.log('formData:', formData);

            
            //send the file to the server
            // axios.post('/freejoa/uploadimage', {
            //     freejoaId:"65b8a03d5439c0e653ad5746",
            //     images: selectedFile
            // })
            // .then(response => {
            //     // console.log('File uploaded:', response.data);
            //     console.log('File uploaded:', response.data.message);
            // })
            // .catch(error => {
            //     console.error('File upload error:', error.response.data.message);
            // });

        } else {
            console.error('No file selected');
        }
    };


    return (
        <div>
            <form onSubmit={handleUpload} >
                <h1>Upload Image</h1>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            <div>
                <p>
                    image preview:
                    </p>
                <img src={selectedFile} alt=''></img>

            </div>

        </div>
    );
}

export default UploadImage;